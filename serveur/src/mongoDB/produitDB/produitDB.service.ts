import { Injectable } from "@nestjs/common";
import { Produit } from "./produitDB.schema";
import { FilterQuery, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProduitService{
    constructor(@InjectModel(Produit.name) private ProduitModel: Model<Produit>) {}

    // Créer un produit
    async createProduit(id:number,nom:string,prix:number,nbstock:number,categorie:string) : Promise<Produit>{
        const produit = new this.ProduitModel({id,nom,prix,nbstock,categorie});
        return produit.save();
    }

    // Supprimer un produit
    async deleteProduit(nom:FilterQuery<Produit>){
        return this.ProduitModel.deleteOne(nom);
    }

    // Get un produit
    async getProduit(nom:FilterQuery<Produit>){
        return this.ProduitModel.findOne(nom);
    }

    // Get tous les produits
    async getAllProduit() : Promise<Produit[]>{
        return this.ProduitModel.find({});
    }

    // Update un produit
    async updateProduit(id : FilterQuery<Produit>,nouv_produit : Partial<Produit>){
        return this.ProduitModel.findOneAndUpdate(id,nouv_produit);
    }
}