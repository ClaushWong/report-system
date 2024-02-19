import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { MongooseModule } from "@nestjs/mongoose";

import { ProfileSchema } from "./schemas";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Profile", schema: ProfileSchema }]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
