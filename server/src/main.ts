import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { StandardSchemaValidationPipe, BadRequestException } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
  });

    // exceptionFactory：校验失败时 Nest 调用，返回要抛的异常
    // code: 'VALIDATION_ERROR'：给程序看的稳定标识
  app.useGlobalPipes(new StandardSchemaValidationPipe({
    exceptionFactory: ( issues )=> {
      const message = issues.map(issue => issue.message).join(';');
      return new BadRequestException({
        code: 'VALIDATION_ERROR',
        message
      })
    }
  }));

  // openapi
  const config = new DocumentBuilder()
    .setTitle('Knowvia API')
    .setDescription('知识库接口')
    .setVersion('1.0')
    .build();
  // createDocument 包在函数里，是为了有人打开文档时再根据当前路由生成，而不是启动时做一份旧快照
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  // 把 Swagger UI 挂到 /api。
  SwaggerModule.setup('api', app, documentFactory);

  // 应先挂管道，再听端口：
  await app.listen(process.env.PORT ?? 3000);

  
}
await bootstrap();



// HTTP 请求
//   → 取出 body / query / param
//   → 【Pipe】校验、转换（你挂的 StandardSchemaValidationPipe）
//   → 通过：把干净数据交给 create/update 方法
//   → 失败：直接 400，Service 根本跑不到
