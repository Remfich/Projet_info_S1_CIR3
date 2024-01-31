import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  async receiveData(@Body() data: any) {
    if(data.message == "recupDonnees"){
      let tabMajAdmin = [1,1,1,1];
      return { data: tabMajAdmin };
    }
    else{
      return {message : "test"};
    }
  }
}
