import { Controller,Post,Get, Param, Body } from "@nestjs/common";
import { ClientService } from "./clientDB.service";
import { Client } from "./clientDB.schema"; 
import { CreateClientDto } from "./dto/create-client-dto";

@Controller('client')
export class ClientController {
    constructor(private readonly ClientService : ClientService){}

    // Trouver un client
    @Post('/getClient')
    async getClient(@Body() email_client : string) : Promise<Client>{
        console.log(typeof(email_client));

        return this.ClientService.getClientByEmail({email_client});
    }

    // Créer un client
    @Post('/createClient')
    async creerClient(@Body() createClientDto : CreateClientDto) : Promise<Client>{
        return this.ClientService.createClient(createClientDto.prenom,createClientDto.nom,
            createClientDto.email,createClientDto.mdp)
    }
}