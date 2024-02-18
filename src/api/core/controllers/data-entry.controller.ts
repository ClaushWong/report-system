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
import { CreateDataEntryDTO } from "../dto/data-entry.dto";
import { CoreAuthGuard } from "@src/auth/guards";
import { User } from "@src/decorations";
import { DataEntryService } from "@src/shared/data-entry.service";

@ApiTags("Core: Data Entry")
@Controller("/api/core/data-entry")
@ApiBearerAuth()
@UseGuards(CoreAuthGuard)
export class DataEntryController {
  constructor(private readonly dataEntry: DataEntryService) {}

  @Get("")
  @ApiQuery({ name: "limit" })
  @ApiQuery({ name: "offset" })
  @ApiQuery({ name: "company" })
  @ApiQuery({ name: "dateRange" })
  async list(
    @Query()
    rawQuery: {
      company?: string;
      dateRange?: string;
      limit: string;
      offset: string;
    },
    @User() user: any
  ) {
    const { query, pagination, returnEmpty } = await this.dataEntry.formatQuery(
      rawQuery,
      user
    );

    if (returnEmpty) {
      return { total: 0, items: [] };
    }

    return await this.dataEntry.list(query, pagination);
  }

  @Get("xls")
  @ApiQuery({ name: "company" })
  @ApiQuery({ name: "dateRange" })
  async exportExcel(
    @Query() rawQuery: { company?: string; dateRange?: string },
    @User() user: any,
    @Res() res: any
  ) {
    return await this.dataEntry.exportExcel(rawQuery, user, res);
  }

  @Post("")
  async create(@Body() body: CreateDataEntryDTO, @User() user: any) {
    return await this.dataEntry.create(body, user);
  }

  @ApiParam({ name: "id" })
  @Get(":id")
  async get(@Param("id") _id: string) {
    return await this.dataEntry.get(_id);
  }

  @ApiParam({ name: "id" })
  @Put(":id")
  async update(
    @Param("id") _id: string,
    @Body() body: CreateDataEntryDTO,
    @User() user: any
  ) {
    return await this.dataEntry.update(_id, body, user);
  }

  @ApiParam({ name: "id" })
  @Delete(":id")
  async delete(@Param("id") _id: string, @User() user: any) {
    return await this.dataEntry.delete(_id, user);
  }
}
