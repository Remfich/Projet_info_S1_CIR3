import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Produit } from './produit.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
  @Prop()
  nom: string;

  @Prop()
  prenom: string;

  @Prop()
  email: string;

  @Prop()
  mdp: string;

  @Prop()
  histo: Array<Produit>;
}

export const ClientSchema = SchemaFactory.createForClass(Client);