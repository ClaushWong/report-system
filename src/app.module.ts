import { Module } from "@nestjs/common";
import { MONGO_URI } from "./config";
import { MongooseCoreModule } from "@nestjs/mongoose/dist/mongoose-core.module";
import { ApiModule } from "./api";
import { BackgroundModule } from "./background";

@Module({
  imports: [
    MongooseCoreModule.forRoot(MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false,
    }),
    ApiModule,
    BackgroundModule,
  ],
})
export class AppModule {}
