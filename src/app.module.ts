import { Module } from "@nestjs/common";
import { MONGO_URI } from "./config";
import { MongooseCoreModule } from "@nestjs/mongoose/dist/mongoose-core.module";
import { BackgroundModule } from "./background";

import {
  CoreApiModule,
  ClientApiModule,
  ProfileApiModule,
  TransactionApiModule,
} from "./modules";

@Module({
  imports: [
    MongooseCoreModule.forRoot(MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false,
    }),
    CoreApiModule,
    ClientApiModule,
    ProfileApiModule,
    TransactionApiModule,
    BackgroundModule,
  ],
})
export class AppModule {}
