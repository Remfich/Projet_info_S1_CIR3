import { Body, Controller, Post } from "@nestjs/common";
import{ip_db, requete} from "../utilitaire"
import { Client } from "src/mongoDB/clientDB/clientDB.schema";



@Controller('connexion_back')
export class ConnexionBackController{

    // Le format des données info_client est {email:"emailclient",mdp:"mdpclient"}
    @Post('/connexion')
    async connectClient(@Body() info_client : any) : Promise<Client|boolean>{
        // Ici on va checker si le client appartient à la DB et s'il est oui ou non un admin
        // On interroge la BD pour avoir le client
        const client = await requete(ip_db+":3000/client/getClient",info_client.email);
        if(client==undefined){ // Si on ne trouve pas de client
            return false;
        }
        else{
            delete client._id;
            delete client.__v;
            return client;
        }
    }

    @Post("/creation")
    async creationClient(@Body() nouv_client : any) : Promise<boolean|Client>{
        try{
            const client = await requete(ip_db+":3000/createClient",nouv_client);
            return client;
        }
        catch(e){
            return false;
        }
    }

    @Post('/modifInfos')
    async modifInfos(@Body() client : any) : Promise<Client|boolean>{
        try{
            const nouv_client = await requete(ip_db+":3000/client/updateClient",client)
            return nouv_client
        } catch(e){
            return false;
        }
    }
}