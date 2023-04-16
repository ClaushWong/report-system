import { Module } from "@nestjs/common";
import { DatabaseModule } from "@src/database";

import { HttpModule } from "@nestjs/axios";

const modules = [];

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: modules,
  exports: modules,
})
export class SharedModule {}
