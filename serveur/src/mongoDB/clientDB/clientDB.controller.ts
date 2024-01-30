import { Controller,Post,Get, Param, Body } from "@nestjs/common";
import { ClientService } from "./clientDB.service";
import { Client } from "./clientDB.schema"; 
import { CreateClientDto } from "./dto/create-client-dto";

@Controller('client')
export class ClientController {
    constructor(private readonly ClientService : ClientService){}

    // Trouver un client
    @Get(':email_client')
    async getClient(@Param('email_client') email_client : string) : Promise<Client>{
        return this.ClientService.getCLientByEmail(email_client);
    }

    // Créer un client
    @Get()
    async creerClient(@Body() createClientDto : CreateClientDto) : Promise<Client>{
        return this.ClientService.createClient(createClientDto.prenom,createClientDto.nom,
            createClientDto.email,createClientDto.mdp)
    }
}