import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import{ip_db, requete} from "./utilitaire"
import { Client } from './mongoDB/clientDB/clientDB.schema';

@Controller('api/data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/afficheClients')
  async receiveData() : Promise<Client[]>{
    const tabClients = await requete(ip_db+':3000/client/getAllClient',{});
    console.log(tabClients);
    return tabClients;
  }

  @Post('/ajoutClient')
  async AjoutClient(@Body() client: any) {
    // On doit d'abord vérifier que le client existe ou pas dans la DB
    const verif = await requete(ip_db+":3000/client/getClient",{email : client.email});
    if(verif==undefined){
      await requete(ip_db+':3000/client/createClient',client);
    }
    else{
      await requete(ip_db+":3000/client/updateClient",client);
    }
    
  }

  @Post('/suprClient')
  async SuprClient(@Body() client: any) {
    await requete(ip_db+':3000/client/deleteClient',client);
  }

  @Post('/afficheStock')
  async receiveStock() {
    const tabStocks = await requete(ip_db+':3000/produit/getAllProduit',{});
    return { data: tabStocks };
  }

  @Post('/ajoutStock')
  async AjoutStock(@Body() stock: any) {
    console.log("Ajout Stock",stock);
    // On doit regarder si le produit existe déjà ou non
    const existe = await requete(ip_db+":3000/produit/getProduit",{id : stock.id});
    if (existe!=undefined){ // Si l'ip est déjà attribué
      await requete(ip_db+":3000/produit/updateProduit",stock);
    }
    else{
      await requete(ip_db+':3000/produit/createProduit',stock);
    }
  }
  @Post('/suprStock')
  async SuprStock(@Body() stock: any) {
    await requete(ip_db+':3000/produit/deleteProduit',stock);
  }
}
