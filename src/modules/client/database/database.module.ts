import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { MongooseModule } from "@nestjs/mongoose";

import { ClientSchema } from "./schemas";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Client", schema: ClientSchema }]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
