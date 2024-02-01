import { Module } from "@nestjs/common";
import { ClientBackController } from "./client.controller";

@Module({
    imports:[],
    controllers:[ClientBackController],
})
export class ClientBackModule{}