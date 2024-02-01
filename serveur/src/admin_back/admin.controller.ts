import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

import{ip_db, requete} from "../utilitaire"

@Controller()
export class AdminController {
  constructor(private readonly appService: AdminService) {}

}
