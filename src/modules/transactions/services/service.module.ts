import { Module } from "@nestjs/common";
import { TransactionDatabaseModule } from "../database";

import { HttpModule } from "@nestjs/axios";
import { TransactionService } from ".";

const modules = [TransactionService];

@Module({
  imports: [TransactionDatabaseModule, HttpModule],
  providers: modules,
  exports: modules,
})
export class ServiceModule {}
