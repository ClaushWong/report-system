import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  providers: [],
})
export class BackgroundModule {}
