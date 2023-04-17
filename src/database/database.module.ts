import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { MongooseModule } from "@nestjs/mongoose";

import {
    AdminSchema,
    CompanySchema,
    DataEntrySchema,
    RoleSchema,
} from "./schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Admin", schema: AdminSchema }]),
        MongooseModule.forFeature([{ name: "Company", schema: CompanySchema }]),
        MongooseModule.forFeature([
            { name: "DataEntry", schema: DataEntrySchema },
        ]),
        MongooseModule.forFeature([{ name: "Role", schema: RoleSchema }]),
    ],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}
