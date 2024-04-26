import { Module } from "@nestjs/common";

import { CoreDatabaseModule } from "@src/modules/core";

import { MongooseCoreModule } from "@nestjs/mongoose/dist/mongoose-core.module";
import { MONGO_URL } from "../config";
import { SeederService } from "./seeder.service";

@Module({
  imports: [
    MongooseCoreModule.forRoot(MONGO_URL, {
      useCreateIndex: true,
    }),
    CoreDatabaseModule,
  ],
  providers: [SeederService],
})
export class ConsoleModule {}
