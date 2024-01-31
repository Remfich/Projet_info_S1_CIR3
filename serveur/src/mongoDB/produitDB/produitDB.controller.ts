import { Body, Controller, Post } from "@nestjs/common";
import { ProduitService } from "./produitDB.service";
import { ProduitDto } from "./dto/createProduit-dto";
import { getProduitDto } from "./dto/getProduit-dto";
import { Produit } from "./produitDB.schema";

@Controller('produit')
export class ProduitController{
    constructor(private readonly ProduitService : ProduitService){}
    
    // Créer un produit
    @Post('/createProduit')
    async createProduit(@Body() nouv_produit : ProduitDto) : Promise<Produit>{
        return this.ProduitService.createProduit(nouv_produit.id,nouv_produit.nom,nouv_produit.prix,nouv_produit.nbstock);
    }

    // Supprimer un produit
    @Post('/deleteProduit')
    async deleteProduit(@Body() id_produit : getProduitDto){
        const id=id_produit.id;
        return this.ProduitService.deleteProduit({id});
    }

    // Obtenir la liste complète des produits
    @Post('/getAllProduit')
    async getAllProduit() : Promise<Produit[]>{
        return this.ProduitService.getAllProduit();
    }

    // Mettre à jour un produit
    @Post('updateProduit')
    async updateProduit(@Body() produit:ProduitDto){
        const id = produit.id
        return this.ProduitService.updateProduit({id},produit);
    }
}