import { Module } from "@nestjs/common";
import { ClientDatabaseModule } from "../database";

import { HttpModule } from "@nestjs/axios";
import { ClientService } from ".";

const modules = [ClientService];

@Module({
  imports: [ClientDatabaseModule, HttpModule],
  providers: modules,
  exports: modules,
})
export class ServiceModule {}
