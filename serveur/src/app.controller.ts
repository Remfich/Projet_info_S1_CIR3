import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import{ip_db, requete} from "./utilitaire"

@Controller('api/data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/afficheClients')
  async receiveData() {
    const tabClients = await requete(ip_db+':3000/client/getAllClient',{});
    return { data: tabClients };
  }

  @Post('/ajoutClient')
  async AjoutClient(@Body() client: any) {
    await requete(ip_db+':3000/client/createClient',client);
  }

  @Post('/suprClient')
  async SuprClient(@Body() client: any) {
    await requete(ip_db+':3000/client/deleteClient',client);
  }
  @Post('/afficheStock')
  async receiveStock(@Body() data: any) {
    const tabStocks = await requete(ip_db+':3000/produit/getAllProduit',{});
    return { data: tabStocks };
  }

  @Post('/ajoutStock')
  async AjoutStock(@Body() stock: any) {
    await requete(ip_db+':3000/produit/createProduit',stock);
  }
  @Post('/suprStock')
  async SuprStock(@Body() stock: any) {
    await requete(ip_db+':3000/produit/deleteProduit',stock);
  }
}
