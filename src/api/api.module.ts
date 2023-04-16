import { Module } from "@nestjs/common";
import { CoreApiModule } from "./core/core.api.module";

@Module({
  imports: [CoreApiModule],
})
export class ApiModule {}
