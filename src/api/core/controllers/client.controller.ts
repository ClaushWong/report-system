import { Controller, Delete, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CoreAuthGuard } from "@src/auth/guards";
import { ClientService } from "@src/shared";
import { User } from "@src/decorations";
import { Query, Get, Post, Put, Body, Param } from "@nestjs/common";
import { CreateClientDTO, UpdateClientDTO } from "../dto/client.dto";

@ApiTags("Core: Client")
@Controller("/api/core/clients")
@ApiBearerAuth()
@UseGuards(CoreAuthGuard)
export class ClientController {
  constructor(private readonly client: ClientService) {}

  @ApiQuery({ name: "offset", required: true })
  @ApiQuery({ name: "limit", required: true })
  @ApiQuery({ name: "name", required: false })
  @Get()
  async getList(
    @Query() rawQuery: { offset: string; limit: string; name?: string },
    @User() user: any
  ) {
    const { query, pagination } = await this.client.formatQuery(rawQuery, user);

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