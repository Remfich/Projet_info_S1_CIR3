import { Controller } from "@nestjs/common";
import { ProduitService } from "./produitDB.service";

@Controller('produit')
export class ProduitController{
    constructor(private readonly ProduitService : ProduitService){}
    
}