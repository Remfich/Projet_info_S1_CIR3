import { Body, Controller, Post } from "@nestjs/common";
import { Produit } from "src/mongoDB/produitDB/produitDB.schema";
import{ip_db, requete} from "../utilitaire"
import { response } from "express";



@Controller('client_back')
export class ClientBackController {

  // Requête pour récupérer les articles de la base de données à l'initialisation de la page
  @Post('/init')
  async init_client() : Promise<Object[]>{
    // On doit demander à la DB la liste des produits pour pouvoir la renvoyer à l'utilisateur
    const reponse = await requete('http://10.224.2.87:3000/produit/getAllProduit',{});
    for (let i=0;i<reponse.length;i++){
      delete reponse[i]._id;
      delete reponse[i].__v;
    }
    return reponse;
  }

  @Post('/ajoutPanier')
  async ajoutPanier(@Body() nom_produit:object) : Promise<boolean>{
    // On reçoit le nom d'un produit, on va interroger la DB sur ce produit pour obtenir ses informations
    const reponse = await requete(ip_db+':3000/produit/getProduit',nom_produit);
    if (reponse.nbstock>=0){
      // Si on a le produit en stock alors on renvoie le produit à la base de donnée et 
      // on lui demande de diminuer le stock de 1
      reponse.nbstock=reponse.nbstock-1;
      delete reponse._id;
      delete reponse.__v;
      await requete(ip_db+':3000/produit/updateProduit',reponse);
      return true;
    }
    else{ // Sinon soit le produit n'existe pas soit on ne l'a plus en stock
      return false;
    }
  }
}