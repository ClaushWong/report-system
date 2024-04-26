import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
  Res,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateTransactionDTO } from "../../dtos/transaction.dto";
import { CoreAuthGuard } from "@src/auth/guards";
import { User } from "@src/decorations";
import { TransactionService } from "../../services";

@ApiTags("Core: Transaction")
@Controller("/api/core/transactions")
@ApiBearerAuth()
@UseGuards(CoreAuthGuard)
export class TransactionController {
  constructor(private readonly transaction: TransactionService) {}

  @Get("")
  @ApiQuery({ name: "limit" })
  @ApiQuery({ name: "offset" })
  @ApiQuery({ name: "dateRange" })
  async list(
    @Query()
    rawQuery: {
      dateRange?: string;
      limit: string;
      offset: string;
    },
    @User() user: any
  ) {
    const { query, pagination, returnEmpty } =
      await this.transaction.formatQuery(rawQuery, user);

    if (returnEmpty) {
      return { total: 0, items: [] };
    }

    return await this.transaction.list(query, pagination);
  }

  @Get("xls")
  @ApiQuery({ name: "dateRange" })
  async exportExcel(
    @Query() rawQuery: { dateRange?: string },
    @User() user: any,
    @Res() res: any
  ) {
    return await this.transaction.exportExcel(rawQuery, user, res);
  }

  @Post("")
  async create(@Body() body: CreateTransactionDTO, @User() user: any) {
    return await this.transaction.create(body, user);
  }

  @ApiParam({ name: "id" })
  @Get(":id")
  async get(@Param("id") _id: string) {
    return await this.transaction.get(_id);
  }

  @ApiParam({ name: "id" })
  @Put(":id")
  async update(
    @Param("id") _id: string,
    @Body() body: CreateTransactionDTO,
    @User() user: any
  ) {
    return await this.transaction.update(_id, body, user);
  }

  @ApiParam({ name: "id" })
  @Delete(":id")
  async delete(@Param("id") _id: string, @User() user: any) {
    return await this.transaction.delete(_id, user);
  }
}
