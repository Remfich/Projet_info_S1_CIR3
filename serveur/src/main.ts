import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Controller, Post, Body } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Get } from '@nestjs/common/decorators';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Activer CORS
  app.enableCors();
  await app.listen(3000);
  
}
bootstrap();

@Controller('api/data')
export class DataController {
  @Post()
  receiveData(@Body() data: any) {
    console.log(data);
    return { message: 'Données reçues' };
  }
  @Get()
  sendData() {
    // Remplacez ceci par les données que vous voulez envoyer
    return { message: 'Hello, world!' };
  }
}