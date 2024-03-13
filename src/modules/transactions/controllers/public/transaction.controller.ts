import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PublicTransactionCreateDTO } from "../../dtos/transaction.dto";
import { TransactionService } from "../../services";

@ApiTags("Core: Transaction")
@Controller("/api/public/transactions")
export class TransactionController {
  constructor(private readonly transaction: TransactionService) {}

  @Post("")
  async createTramsaction(@Body() body: PublicTransactionCreateDTO) {
    return await this.transaction.publicCreate(body);
  }
}
