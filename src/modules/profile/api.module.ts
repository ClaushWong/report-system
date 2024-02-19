import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth";
import { ProfileDatabaseModule } from "./database";
import { ProfileServiceModule } from "./services";

import { ProfileController } from "./controllers";

const controllers = [ProfileController];

@Module({
  imports: [ProfileDatabaseModule, AuthModule, ProfileServiceModule],
  controllers,
  providers: [],
  exports: [],
})
export class ApiModule {}
