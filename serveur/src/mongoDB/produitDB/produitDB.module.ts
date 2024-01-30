import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Produit, ProduitSchema } from './produitDB.schema';
import { ProduitController } from './produitDB.controller';

@Module({
  imports: [MongooseModule.forFeature([{name : Produit.name, schema : ProduitSchema}])],
  controllers : [ProduitController],
  providers : [ProduitService]
})
export class ProduitModule {}