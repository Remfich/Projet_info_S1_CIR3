import { Body, Controller, Post } from "@nestjs/common";
import { Produit } from "src/mongoDB/produitDB/produitDB.schema";
import{requete} from "../utilitaire"



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
}