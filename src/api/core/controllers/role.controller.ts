import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { User } from "@src/decorations";
import { CoreAuthGuard } from "@src/auth/guards";
import { DatabaseService } from "@src/database";
import { CreateRoleDTO } from "../dto/role.dto";

@ApiTags("Core: Role")
@ApiBearerAuth()
@Controller("/api/core/role")
@UseGuards(CoreAuthGuard)
export class RoleController {
    constructor(private readonly database: DatabaseService) {}

    @ApiQuery({ name: "offset" })
    @ApiQuery({ name: "limit" })
    @ApiQuery({ name: "name" })
    @ApiQuery({ name: "type" })
    @Get("")
    async list(@Query() { offset = "0", limit = "0", name, type }) {
        const query: any = {
            deletedAt: { $eq: null },
        };

        if (name) {
            query.name = { $regex: new RegExp(name, "i") };
        }

        if (type) {
            query.type = type;
        }

        const total = await this.database.Role.countDocuments(query);
        const items = await this.database.Role.find(query)
            .sort("-createdAt")
            .skip(parseInt(offset))
            .limit(parseInt(limit));

        return { total, items };
    }

    @ApiParam({ name: "id" })
    @Get(":id")
    async get(@Param("id") _id: string) {
        const res: any = await this.database.Role.findById(_id);

        if (res) {
            return res;
        }

        throw new NotFoundException();
    }

    @Post("")
    async create(@Body() body: CreateRoleDTO) {
        try {
            const role = new this.database.Role();

            Object.assign(role, body);

            await role.save();

            return { success: true };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @ApiParam({ name: "id" })
    @Put(":id")
    async update(@Param("id") _id: string, @Body() body: CreateRoleDTO) {
        try {
            const role = await this.database.Role.findById(_id);

            if (!role) {
                throw new NotFoundException();
            }

            Object.assign(role, body);

            await role.save();

            return { success: true };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @ApiParam({ name: "id" })
    @Delete(":id")
    async delete(@Param("id") _id: string) {
        try {
            const role = await this.database.Role.findById(_id);

            role.deletedAt = new Date();

            await role.save();

            return { success: true };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
