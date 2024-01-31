import { Controller,Post, Body } from "@nestjs/common";
import { ClientService } from "./clientDB.service";
import { Client } from "./clientDB.schema"; 
import { CreateClientDto } from "./dto/create-client-dto";
import { getClientDto } from "./dto/getClient-dto";
import { updateClientDto } from "./dto/updateInfo-dto";

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
            createClientDto.email,createClientDto.mdp,createClientDto.est_admin)
    }

    // Supprimer un client
    @Post('/deleteClient')
    async deleteClient(@Body() email_client : getClientDto){
        const email = email_client.email;
        return this.ClientService.deleteClient({email});
    }

    // Modifier un client
    @Post('/updateClient')
    async updateClient(@Body() nouv_client : updateClientDto) : Promise<Client>{
        const email = nouv_client.email;
        return this.ClientService.updateClient({email},nouv_client)
    }
}