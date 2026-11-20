import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { KnowledgeBasesModule } from './knowledge-bases/knowledge-bases.module.js';

@Module({
  imports: [KnowledgeBasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
