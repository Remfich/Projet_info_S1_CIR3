import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Controller, Post, Body } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
  
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Activer CORS
  app.enableCors();
  await app.listen(3000);
  
}
bootstrap();
