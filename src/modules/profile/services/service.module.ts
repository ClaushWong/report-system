import { Module } from "@nestjs/common";
import { ProfileDatabaseModule } from "../database";

import { HttpModule } from "@nestjs/axios";
import { ProfileService } from ".";
import { ClientServiceModule } from "@src/modules/client";

const modules = [ProfileService];

@Module({
  imports: [ProfileDatabaseModule, ClientServiceModule, HttpModule],
  providers: modules,
  exports: modules,
})
export class ServiceModule {}
