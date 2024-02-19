import { Module } from "@nestjs/common";
import { TransactionDatabaseModule } from "../database";

import { HttpModule } from "@nestjs/axios";
import { TransactionService } from ".";
import { ProfileServiceModule } from "@src/modules/profile";

const modules = [TransactionService];

@Module({
  imports: [TransactionDatabaseModule, ProfileServiceModule, HttpModule],
  providers: modules,
  exports: modules,
})
export class ServiceModule {}
