import { Module } from "@nestjs/common";
import { AuthModule } from "../../auth";
import { DatabaseModule } from "../../database";
import { SharedModule } from "../../shared";

import { AuthController } from "./controllers/auth.controller";
import { CompanyController } from "./controllers/company.controller";
import { DataEntryController } from "./controllers/data-entry.controller";
import { DashboardController } from "./controllers/dashboard.controller";
import { RoleController } from "./controllers/role.controller";
import { UserController } from "./controllers/user.controller";

const controllers = [
  AuthController,
  CompanyController,
  DataEntryController,
  DashboardController,
  RoleController,
  UserController,
];

@Module({
  imports: [DatabaseModule, AuthModule, SharedModule],
  controllers,
  providers: [],
  exports: [],
})
export class CoreApiModule {}
