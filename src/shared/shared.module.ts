import { Module } from "@nestjs/common";
import { DatabaseModule } from "@src/database";

import { HttpModule } from "@nestjs/axios";
import { DashboardService } from "./dashboard.service";
import {
  UserService,
  ClientService,
  CompanyService,
  DataEntryService,
  RoleService,
} from ".";

const modules = [
  DashboardService,
  UserService,
  ClientService,
  CompanyService,
  DataEntryService,
  RoleService,
];

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: modules,
  exports: modules,
})
export class SharedModule {}
