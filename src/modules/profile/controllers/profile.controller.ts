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
import { CreateProfileDTO } from "../dtos/profile.dto";
import { CoreAuthGuard } from "@src/auth/guards";
import { User } from "@src/decorations";
import { ProfileService } from "../services/profile.service";

@ApiTags("Core: Profile")
@Controller("/api/core/profile")
@ApiBearerAuth()
@UseGuards(CoreAuthGuard)
export class ProfileController {
  constructor(private readonly profile: ProfileService) {}

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
    const { query, pagination, returnEmpty } = await this.profile.formatQuery(
      rawQuery,
      user
    );

    if (returnEmpty) {
      return { total: 0, items: [] };
    }

    return await this.profile.list(query, pagination);
  }

  @Post("")
  async create(@Body() body: CreateProfileDTO, @User() user: any) {
    return await this.profile.create(body, user);
  }

  @ApiParam({ name: "id" })
  @Get(":id")
  async get(@Param("id") _id: string) {
    return await this.profile.get(_id);
  }

  @ApiParam({ name: "id" })
  @Put(":id")
  async update(
    @Param("id") _id: string,
    @Body() body: CreateProfileDTO,
    @User() user: any
  ) {
    return await this.profile.update(_id, body, user);
  }

  @ApiParam({ name: "id" })
  @Delete(":id")
  async delete(@Param("id") _id: string, @User() user: any) {
    return await this.profile.delete(_id, user);
  }
}
