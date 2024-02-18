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
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateCompanyDTO } from "../dto/company.dto";
import { CoreAuthGuard } from "@src/auth/guards";
import { User } from "@src/decorations";
import { CompanyService } from "@src/shared/company.service";

@ApiTags("Core: Company")
@Controller("/api/core/company")
@ApiBearerAuth()
@UseGuards(CoreAuthGuard)
export class CompanyController {
  constructor(private readonly company: CompanyService) {}

  @Get("")
  @ApiQuery({ name: "limit" })
  @ApiQuery({ name: "offset" })
  @ApiQuery({ name: "name" })
  @ApiQuery({ name: "client" })
  async list(
    @Query()
    rawQuery: { limit: string; offset: string; name?: string; client?: string },
    @User() user: any
  ) {
    const { query, pagination, returnEmpty } = await this.company.formatQuery(
      rawQuery,
      user
    );

    if (returnEmpty) {
      return { total: 0, items: [] };
    }

    return await this.company.list(query, pagination);
  }

  @Post("")
  async create(@Body() body: CreateCompanyDTO, @User() user: any) {
    return await this.company.create(body, user);
  }

  @ApiParam({ name: "id" })
  @Get(":id")
  async get(@Param("id") _id: string) {
    return await this.company.get(_id);
  }

  @ApiParam({ name: "id" })
  @Put(":id")
  async update(
    @Param("id") _id: string,
    @Body() body: CreateCompanyDTO,
    @User() user: any
  ) {
    return await this.company.update(_id, body, user);
  }

  @ApiParam({ name: "id" })
  @Delete(":id")
  async delete(@Param("id") _id: string, @User() user: any) {
    return await this.company.delete(_id, user);
  }
}
