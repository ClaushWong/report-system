import { Module } from "@nestjs/common";
import { AuthModule } from "../../auth";
import { DatabaseModule } from "../../database";
import { SharedModule } from "../../shared";

import { AuthController } from "./controllers/auth.controller";
import { CompanyController } from "./controllers/company.controller";
import { DataEntryController } from "./controllers/data-entry.controller";

const controllers = [AuthController, CompanyController, DataEntryController];

@Module({
    imports: [DatabaseModule, AuthModule, SharedModule],
    controllers,
    providers: [],
    exports: [],
})
export class CoreApiModule {}
