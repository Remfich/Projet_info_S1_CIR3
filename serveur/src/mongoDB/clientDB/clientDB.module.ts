import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {ClientController} from './clientDB.controller';
import {ClientService} from './clientDB.service';
import {Client,ClientSchema} from './clientDB.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}