import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { DatabaseModule } from "../database";

import { AuthCoreService } from "./services/auth-core.service";
import { CoreAuthStrategy } from "./strategies";

@Module({
  imports: [DatabaseModule, PassportModule],
  providers: [AuthService, CoreAuthStrategy, AuthCoreService],
  exports: [AuthService],
})
export class AuthModule {}
