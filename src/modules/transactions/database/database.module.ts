import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { MongooseModule } from "@nestjs/mongoose";

import { TransactionSchema } from "./schemas";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Transaction", schema: TransactionSchema },
    ]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
