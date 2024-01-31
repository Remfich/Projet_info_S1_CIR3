import { Controller, Post, Body } from '@nestjs/common';

@Controller('api/data')
export class DataController {
  @Post()
  receiveData(@Body() data: any) {
    console.log(data);
    return { message: 'Données reçues' };
  }
}