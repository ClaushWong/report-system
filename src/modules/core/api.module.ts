import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth";
import { CoreDatabaseModule } from "./database";
import { CoreServiceModule } from "./services";

import { AuthController, UserController, RoleController } from "./controllers";

const controllers = [AuthController, RoleController, UserController];

@Module({
  imports: [CoreDatabaseModule, AuthModule, CoreServiceModule],
  controllers,
  providers: [],
  exports: [],
})
export class CoreApiModule {}
