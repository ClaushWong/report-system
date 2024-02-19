import { Module } from "@nestjs/common";
import { CoreDatabaseModule } from "../database";

import { HttpModule } from "@nestjs/axios";
import { UserService, RoleService } from ".";

const modules = [UserService, RoleService];

@Module({
  imports: [CoreDatabaseModule, HttpModule],
  providers: modules,
  exports: modules,
})
export class ServiceModule {}
