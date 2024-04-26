import { Module } from "@nestjs/common";
import { MONGO_URI } from "./config";
import { MongooseCoreModule } from "@nestjs/mongoose/dist/mongoose-core.module";
import { BackgroundModule } from "./background";

import {
  CoreApiModule,
  ClientApiModule,
  CoreTransactionApiModule,
  PublicTransactionApiModule,
} from "./modules";
import { DashboardApiModule } from "./modules/dashboard";

@Module({
  imports: [
    MongooseCoreModule.forRoot(MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false,
    }),
    CoreApiModule,
    ClientApiModule,
    CoreTransactionApiModule,
    PublicTransactionApiModule,
    DashboardApiModule,
    BackgroundModule,
  ],
})
export class AppModule {}
