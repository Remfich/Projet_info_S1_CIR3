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
    const tabClients = await requete('http://127.0.0.1:3000/client/getAllClient',{});
    return { data: tabClients };
  }

  @Post('/ajoutClient')
  async AjoutClient(@Body() client: any) {
    await requete('http://127.0.0.1:3000/client/createClient',client);
    console.log(client, " a bien été ajouté à la BDD.")
  }

  @Post('/suprClient')
  async SuprClient(@Body() client: any) {
    await requete('http://127.0.0.1:3000/client/deleteClient',client);
  }
  @Post('/afficheStock')
  async receiveStock(@Body() data: any) {
    const tabStocks = await requete('http://127.0.0.1:3000/produit/getAllProduit',{});
    return { data: tabStocks };
  }

  @Post('/ajoutStock')
  async AjoutStock(@Body() stock: any) {
    await requete('http://127.0.0.1:3000/produit/createProduit',stock);
    console.log(stock, " a bien été ajouté à la BDD.")
  }
  @Post('/suprStock')
  async SuprStock(@Body() stock: any) {
    await requete('http://127.0.0.1:3000/produit/deleteProduit',stock);
    console.log(stock, " va être supprimé.")
  }
}
