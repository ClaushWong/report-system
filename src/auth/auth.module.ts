import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CoreDatabaseModule } from "@src/modules/core";

import { AuthCoreService } from "./services/auth-core.service";
import { CoreAuthStrategy } from "./strategies";

@Module({
  imports: [CoreDatabaseModule, PassportModule],
  providers: [AuthService, CoreAuthStrategy, AuthCoreService],
  exports: [AuthService],
})
export class AuthModule {}
