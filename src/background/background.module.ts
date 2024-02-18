import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { SharedModule } from "../shared";
import { DatabaseModule } from "../database";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule, SharedModule, HttpModule],
  providers: [],
})
export class BackgroundModule {}
