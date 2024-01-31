import { Controller, Post, Body } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';

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