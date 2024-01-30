import { Controller,Post, Body } from "@nestjs/common";
import { ClientService } from "./clientDB.service";
import { Client } from "./clientDB.schema"; 
import { CreateClientDto } from "./dto/create-client-dto";
import { getClientDto } from "./dto/getClient-dto";

@Controller('client')
export class ClientController {
    constructor(private readonly ClientService : ClientService){}

    // Trouver un client
    @Post('/getClient')
    async getClient(@Body() email_client : getClientDto) : Promise<Client>{
        const email = email_client.email;
        return this.ClientService.getClientByEmail({email});
    }

    // Créer un client
    @Post('/createClient')
    async creerClient(@Body() createClientDto : CreateClientDto) : Promise<Client>{
        return this.ClientService.createClient(createClientDto.prenom,createClientDto.nom,
            createClientDto.email,createClientDto.mdp)
    }

    // Supprimer un client
    @Post('/deleteClient')
    async deleteClient(@Body() email_client : getClientDto){
        const email = email_client.email;
        return this.ClientService.deleteClient({email});
    }
}