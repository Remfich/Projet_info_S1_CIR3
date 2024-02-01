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
  async receiveData(@Body() data: any) {
    if(data.message == "recupDonnees"){//récup de données
      const tabClients = await requete('http://127.0.0.1:3000/clients/getAllClient',{});
      return { data: tabClients };
    }
    else{//Maj de données de la BDD
      return {message : "test"};
    }
  }
  @Post('/ajoutClient')
  async AjoutClient(@Body() client: any) {
    await requete('http://127.0.0.1:3000/clients/ajoutClient',client);
    console.log(client, " a bien été ajouté à la BDD.")
  }
  @Post('/suprClient')
  async SuprClient(@Body() client: any) {
    await requete('http://127.0.0.1:3000/clients/suprClient',client);
    console.log(client, " va être supprimé.")
  }
  @Post('/afficheStock')
  async receiveStock(@Body() data: any) {
    if(data.message == "recupDonnees"){//récup de données
      const tabStocks = await requete('http://127.0.0.1:3000/stocks/getAllStock',{});
      return { data: tabStocks };
    }
    else{//Maj de données de la BDD
      return {message : "test"};
    }
  }
  @Post('/ajoutStock')
  async AjoutStock(@Body() stock: any) {
    await requete('http://127.0.0.1:3000/stocks/ajoutStock',stock);
    console.log(stock, " a bien été ajouté à la BDD.")
  }
  @Post('/suprStock')
  async SuprStock(@Body() stock: any) {
    await requete('http://127.0.0.1:3000/stocks/suprStock',stock);
    console.log(stock, " va être supprimé.")
  }
}
