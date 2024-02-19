import { Module } from "@nestjs/common";
import { ClientDatabaseModule } from "../database";

import { HttpModule } from "@nestjs/axios";
import { ClientService } from ".";
import { CoreServiceModule } from "@src/modules/core/services";

const modules = [ClientService];

@Module({
  imports: [ClientDatabaseModule, CoreServiceModule, HttpModule],
  providers: modules,
  exports: modules,
})
export class ServiceModule {}
