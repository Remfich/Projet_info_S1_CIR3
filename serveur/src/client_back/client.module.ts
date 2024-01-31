import { Module } from "@nestjs/common";
import { ClientBackController } from "./client.controller";
import { ClientBackService } from "./client.service";

@Module({
    imports:[],
    controllers:[ClientBackController],
    providers:[ClientBackService]
})
export class ClientBackModule{}