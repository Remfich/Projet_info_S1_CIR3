import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './clientDB.schema';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private ClientModel: Model<Client>) {}

    // Trouver et retourner un client
    async getClientByEmail(email_client : FilterQuery<Client>) : Promise<Client>{
        return this.ClientModel.findOne(email_client);
    }

    // Créer un client
    async createClient(nom : string, prenom : string, email : string, mdp : string,est_admin : boolean){
        const client = new this.ClientModel({nom,prenom,email,mdp,est_admin});
        return client.save();
    }

    // Trouve et supprime un client
    async deleteClient(email_client : FilterQuery<Client>){
        return this.ClientModel.deleteOne(email_client);
    }

    // Actualise les données d'un client
    async updateClient(email_client : FilterQuery<Client>, client : Partial<Client>) : Promise<Client>{
        return this.ClientModel.findOneAndUpdate(email_client,client);
    }
}