import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth";
import { TransactionDatabaseModule } from "./database";
import { TransactionServiceModule } from "./services";

import { PublicTransactionController } from "./controllers";

const controllers = [PublicTransactionController];

@Module({
  imports: [TransactionDatabaseModule, AuthModule, TransactionServiceModule],
  controllers,
  providers: [],
  exports: [],
})
export class ApiModule {}
