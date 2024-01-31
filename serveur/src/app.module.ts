import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './mongoDB/clientDB/clientDB.module';
import { ProduitModule } from './mongoDB/produitDB/produitDB.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/Projet_Info'),
    ClientModule,ProduitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
