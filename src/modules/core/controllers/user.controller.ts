import {
  BadRequestException,
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
import { User } from "@src/decorations";
import { CoreAuthGuard } from "@src/auth/guards";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { UserService } from "../services";

@ApiTags("Core: User")
@ApiBearerAuth()
@Controller("/api/core/user")
@UseGuards(CoreAuthGuard)
export class UserController {
  constructor(private readonly user: UserService) {}

  @ApiQuery({ name: "offset" })
  @ApiQuery({ name: "limit" })
  @ApiQuery({ name: "name" })
  @ApiQuery({ name: "type" })
  @Get("")
  async list(
    @Query()
    rawQuery: { offset: string; limit: string; name?: string; type?: string },
    @User() user: any
  ) {
    const { query, pagination } = await this.user.formatQuery(rawQuery, user);

    return await this.user.list(query, pagination);
  }

  @ApiParam({ name: "id" })
  @Get(":id")
  async get(@Param("id") _id: string) {
    return await this.user.get(_id);
  }

  @Post("")
  async create(@Body() body: CreateUserDTO, @User() user: any) {
    return await this.user.create(body, user);
  }

  @ApiParam({ name: "id" })
  @Put(":id")
  async update(
    @Param("id") _id: string,
    @Body() body: UpdateUserDTO,
    @User() user: any
  ) {
    return await this.user.update(_id, body, user);
  }

  @ApiParam({ name: "id" })
  @ApiParam({ name: "status" })
  @Put(":id/:status")
  async updateStatus(
    @Param("id") _id: string,
    @Param("status") status: string,
    @User() user: any
  ) {
    switch (status) {
      case "active":
        return await this.user.updateActive(_id, user);
      case "suspend":
        return await this.user.updateSuspend(_id, user);
      default:
        throw new BadRequestException("Invalid status");
    }
  }

  @ApiParam({ name: "id" })
  @Delete(":id")
  async delete(@Param("id") _id: string, @User() user: any) {
    return await this.user.delete(_id, user);
  }
}
