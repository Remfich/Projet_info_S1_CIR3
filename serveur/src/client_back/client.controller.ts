import { Body, Controller, Post } from "@nestjs/common";
import { Produit } from "src/mongoDB/produitDB/produitDB.schema";

@Controller('client_back')
export class DataController {

  // Requête pour récupérer les articles de la base de données à l'initialisation de la page
  @Post('/init')
  async init_client() : Promise<Produit[]>{
    // On doit demander à la DB la liste des produits pour pouvoir la renvoyer à l'utilisateur
    //const reponse = requete(ip_db+":3000/produit/getAll",{});
    console.log("Test");
    return ;
  }
}