import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { StandardSchemaValidationPipe, BadRequestException } from '@nestjs/common';

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

  // 应先挂管道，再听端口：
  await app.listen(process.env.PORT ?? 3000);

  
}
await bootstrap();



// HTTP 请求
//   → 取出 body / query / param
//   → 【Pipe】校验、转换（你挂的 StandardSchemaValidationPipe）
//   → 通过：把干净数据交给 create/update 方法
//   → 失败：直接 400，Service 根本跑不到
