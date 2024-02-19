import { Module } from "@nestjs/common";

import { CoreDatabaseModule } from "@src/modules/core";

import { MongooseCoreModule } from "@nestjs/mongoose/dist/mongoose-core.module";
import { MONGO_URI } from "../config";
import { SeederService } from "./seeder.service";

@Module({
  imports: [
    MongooseCoreModule.forRoot(MONGO_URI, {
      useCreateIndex: true,
    }),
    CoreDatabaseModule,
  ],
  providers: [SeederService],
})
export class ConsoleModule {}
