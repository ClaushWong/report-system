import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";

import { SharedModule } from "../shared/shared.module";
import { MongooseCoreModule } from "@nestjs/mongoose/dist/mongoose-core.module";
import { MONGO_URI } from "../config";
import { SeederService } from "./seeder.service";

@Module({
  imports: [
    MongooseCoreModule.forRoot(MONGO_URI, {
      useCreateIndex: true,
    }),
    DatabaseModule,
    SharedModule,
  ],
  providers: [SeederService],
})
export class ConsoleModule {}
