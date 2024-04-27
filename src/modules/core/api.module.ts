import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth";
import { CoreDatabaseModule } from "./database";
import { CoreServiceModule } from "./services";

import {
  AuthController,
  UserController,
  RoleController,
  HelperController,
} from "./controllers";

const controllers = [
  AuthController,
  RoleController,
  UserController,
  HelperController,
];

@Module({
  imports: [CoreDatabaseModule, AuthModule, CoreServiceModule],
  controllers,
  providers: [],
  exports: [],
})
export class CoreApiModule {}
