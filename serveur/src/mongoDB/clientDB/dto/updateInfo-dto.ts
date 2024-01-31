import { Produit } from "src/mongoDB/produitDB/produitDB.schema"

export class updateClientDto{
    nom : string
    prenom : string
    email : string
    mdp : string
    histo : Produit[]
}