import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth";
import { ClientDatabaseModule } from "./database";
import { ClientServiceModule } from "./services";

import { ClientController } from "./controllers";

const controllers = [ClientController];

@Module({
  imports: [ClientDatabaseModule, AuthModule, ClientServiceModule],
  controllers,
  providers: [],
  exports: [],
})
export class ApiModule {}
