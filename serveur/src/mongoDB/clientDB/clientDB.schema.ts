import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Produit } from '../produitDB/produitDB.schema';

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
  est_admin: boolean

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produit' }] })
  histo: Produit[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);