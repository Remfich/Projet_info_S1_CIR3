import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProduitDocument = HydratedDocument<Produit>;

@Schema()
export class Produit {
  @Prop()
  id: number;

  @Prop()
  nom: string;

  @Prop()
  prix: number;

  @Prop()
  nbstock: number;
}

export const ProduitSchema = SchemaFactory.createForClass(Produit);