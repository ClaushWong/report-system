import { Module } from "@nestjs/common";
import { DatabaseModule } from "@src/database";

import { HttpModule } from "@nestjs/axios";
import { DashboardService } from "./dashboard.service";

const modules = [DashboardService];

@Module({
    imports: [DatabaseModule, HttpModule],
    providers: modules,
    exports: modules,
})
export class SharedModule {}
