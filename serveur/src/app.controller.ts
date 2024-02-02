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
    console.log("Demande liste client");
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
    console.log("Suppression Client");
    await requete(ip_db+':3000/client/deleteClient',client);
  }

  @Post('/afficheStock')
  async receiveStock() {
    console.log("Demande stock complet");
    const tabStocks = await requete(ip_db+':3000/produit/getAllProduit',{});
    return { data: tabStocks };
  }

  @Post('/ajoutStock')
  async AjoutStock(@Body() stock: any) {
    console.log("Ajout Stock");
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
  @Post('/statsVentes')
  async stats() {
    const clients = await requete(ip_db+':3000/client/getAllClient',{});
    
    const produits = await requete(ip_db+':3000/produit/getAllProduit',{});

    var tabVentes = {};
    for (let index = 0; index < produits.length; index++) {
      tabVentes[produits[index].nom] = 0;
    }

    for (let index = 0; index < clients.length; index++) {
      if(clients[index].histo[0] != undefined){//Si y a un historique
        clients[index].histo[0][0];
        for (let index2 = 0; index2 < clients[index].histo[0].length; index2++) {//On parcourt l'historique du client qui a un historique
          tabVentes[clients[index].histo[0][index2].nom] = clients[index].histo[0][index2].quantite;
        }
      }
    }
    return {data : tabVentes};
  }
}