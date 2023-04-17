import { Module } from "@nestjs/common";
import { AuthModule } from "../../auth";
import { DatabaseModule } from "../../database";
import { SharedModule } from "../../shared";

import { AuthController } from "./controllers/auth.controller";
import { CompanyController } from "./controllers/company.controller";
import { DataEntryController } from "./controllers/data-entry.controller";
import { DashboardController } from "./controllers/dashboard.controller";

const controllers = [
    AuthController,
    CompanyController,
    DataEntryController,
    DashboardController,
];

@Module({
    imports: [DatabaseModule, AuthModule, SharedModule],
    controllers,
    providers: [],
    exports: [],
})
export class CoreApiModule {}
