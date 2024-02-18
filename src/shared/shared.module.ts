import { Module } from "@nestjs/common";
import { DatabaseModule } from "@src/database";

import { HttpModule } from "@nestjs/axios";
import { DashboardService } from "./dashboard.service";
import { UserService } from "./user.service";

const modules = [DashboardService, UserService];

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: modules,
  exports: modules,
})
export class SharedModule {}
