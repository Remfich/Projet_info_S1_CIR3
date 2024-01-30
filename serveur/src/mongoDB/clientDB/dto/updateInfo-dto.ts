import { Produit } from "src/mongoDB/produitDB/produitDB.schema"

export class updateInfoDto{
    nom : string
    prenom : string
    mdp : string
    histo : Produit[]
}