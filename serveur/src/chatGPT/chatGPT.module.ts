import { Module } from "@nestjs/common";
import { ChatGPTController } from "./chatGPT.controller";

@Module({
    imports:[],
    controllers:[ChatGPTController],
})
export class ChatGPTModule{}