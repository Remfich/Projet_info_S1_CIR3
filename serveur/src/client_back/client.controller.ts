import { Body, Controller, Post } from "@nestjs/common";
import { Produit } from "src/mongoDB/produitDB/produitDB.schema";
import{requete} from "../utilitaire"
import { ProduitDto } from "src/mongoDB/produitDB/dto/Produit-dto";

@Controller('client_back')
export class ClientBackController {

  // Requête pour récupérer les articles de la base de données à l'initialisation de la page
  @Post('/init')
  async init_client() : Promise<Produit[]>{
    // On doit demander à la DB la liste des produits pour pouvoir la renvoyer à l'utilisateur
    const reponse = requete('http://10.224.2.87:3000/produit/getAllProduit',{});
    console.log(typeof(reponse));
    
    return reponse;
  }
}