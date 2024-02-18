import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CoreAuthGuard } from "@src/auth/guards";
import { User } from "@src/decorations";
import { RoleService } from "@src/shared";
import { CreateRoleDTO } from "../dto/role.dto";

@ApiTags("Core: Role")
@ApiBearerAuth()
@Controller("/api/core/role")
@UseGuards(CoreAuthGuard)
export class RoleController {
  constructor(private readonly role: RoleService) {}

  @ApiQuery({ name: "offset" })
  @ApiQuery({ name: "limit" })
  @ApiQuery({ name: "name" })
  @ApiQuery({ name: "type" })
  @Get("")
  async list(
    @Query()
    rawQuery: {
      offset: string;
      limit: string;
      name?: string;
      type?: string;
    }
  ) {
    const { query, pagination } = await this.role.formatQuery(rawQuery);

    return await this.role.list(query, pagination);
  }

  @ApiParam({ name: "id" })
  @Get(":id")
  async get(@Param("id") _id: string) {
    return await this.role.get(_id);
  }

  @Post("")
  async create(@Body() body: CreateRoleDTO, @User() user: any) {
    return await this.role.create(body, user);
  }

  @ApiParam({ name: "id" })
  @Put(":id")
  async update(
    @Param("id") _id: string,
    @Body() body: CreateRoleDTO,
    @User() user: any
  ) {
    return await this.role.update(_id, body, user);
  }

  @ApiParam({ name: "id" })
  @Delete(":id")
  async delete(@Param("id") _id: string, @User() user: any) {
    return await this.role.delete(_id, user);
  }
}
