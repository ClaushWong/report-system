import { Module } from "@nestjs/common";
import { TransactionDatabaseModule } from "../database";

import { HttpModule } from "@nestjs/axios";
import { TransactionService } from ".";
import { ClientServiceModule } from "@src/modules/client";

const modules = [TransactionService];

@Module({
  imports: [TransactionDatabaseModule, ClientServiceModule, HttpModule],
  providers: modules,
  exports: modules,
})
export class ServiceModule {}
