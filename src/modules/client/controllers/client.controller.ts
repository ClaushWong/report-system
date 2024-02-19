import { Controller, Delete, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CoreAuthGuard } from "@src/auth/guards";
import { ClientService } from "../services";
import { User } from "@src/decorations";
import { Query, Get, Post, Put, Body, Param } from "@nestjs/common";
import { CreateClientDTO, UpdateClientDTO } from "../dtos/client.dto";

@ApiTags("Core: Client")
@Controller("/api/core/clients")
@ApiBearerAuth()
@UseGuards(CoreAuthGuard)
export class ClientController {
  constructor(private readonly client: ClientService) {}

  @ApiQuery({ name: "offset", required: true })
  @ApiQuery({ name: "limit", required: true })
  @ApiQuery({ name: "name", required: false })
  @ApiQuery({ name: "user", required: false })
  @Get()
  async getList(
    @Query()
    rawQuery: { offset: string; limit: string; name?: string; user?: string },
    @User() user: any
  ) {
    const { query, pagination, returnEmpty } = await this.client.formatQuery(
      rawQuery,
      user
    );

    if (returnEmpty) {
      return { total: 0, items: [] };
    }

    return await this.client.list(query, pagination);
  }

  @Post()
  async create(@Body() data: CreateClientDTO, @User() user: any) {
    return await this.client.create(data, user);
  }

  @ApiParam({ name: "id" })
  @Get("/:id")
  async get(@Param("id") id: string) {
    return await this.client.get(id);
  }

  @ApiParam({ name: "id" })
  @Put("/:id")
  async update(
    @Param("id") id: string,
    @Body() data: UpdateClientDTO,
    @User() user
  ) {
    return await this.client.update(id, data, user);
  }

  @ApiParam({ name: "id" })
  @Delete("/:id")
  async delete(@Param("id") id: string, @User() user) {
    return await this.client.delete(id, user);
  }
}
