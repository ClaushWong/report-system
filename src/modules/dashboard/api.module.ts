import { Module } from "@nestjs/common";
import { AuthModule } from "@src/auth";
import { ClientServiceModule } from "@src/modules/client/services";
import { TransactionServiceModule } from "../transactions";

import { DashboardController } from "./controllers";

const controllers = [DashboardController];

@Module({
  imports: [AuthModule, ClientServiceModule, TransactionServiceModule],
  controllers,
  providers: [],
  exports: [],
})
export class ApiModule {}
