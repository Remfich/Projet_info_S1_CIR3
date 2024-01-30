import { Injectable } from "@nestjs/common";
import { Produit } from "./produitDB.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProduitService{
    constructor(@InjectModel(Produit.name) private ProduitModel: Model<Produit>) {}

}