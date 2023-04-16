import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { MongooseModule } from "@nestjs/mongoose";

import { AdminSchema, CompanySchema } from "./schema";
import { DataEntrySchema } from "./schema/data-entry.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Admin", schema: AdminSchema }]),
        MongooseModule.forFeature([{ name: "Company", schema: CompanySchema }]),
        MongooseModule.forFeature([
            { name: "DataEntry", schema: DataEntrySchema },
        ]),
    ],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}
