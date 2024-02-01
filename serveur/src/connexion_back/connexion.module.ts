import { Module } from "@nestjs/common";
import { ConnexionBackController } from "./connexion.controller";

@Module({
    imports:[],
    controllers:[ConnexionBackController],
})
export class ConnexionBackModule{}