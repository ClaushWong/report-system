import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { MongooseModule } from "@nestjs/mongoose";

import {
  UserSchema,
  CompanySchema,
  DataEntrySchema,
  RoleSchema,
  ClientSchema,
} from "./schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "Client", schema: ClientSchema }]),
    MongooseModule.forFeature([{ name: "Company", schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: "DataEntry", schema: DataEntrySchema }]),
    MongooseModule.forFeature([{ name: "Role", schema: RoleSchema }]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
