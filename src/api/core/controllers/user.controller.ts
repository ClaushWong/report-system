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
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto";

@ApiTags("Core: Role")
@ApiBearerAuth()
@Controller("/api/core/user")
@UseGuards(CoreAuthGuard)
export class UserController {
    constructor(private readonly database: DatabaseService) {}

    @ApiQuery({ name: "offset" })
    @ApiQuery({ name: "limit" })
    @ApiQuery({ name: "name" })
    @ApiQuery({ name: "type" })
    @Get("")
    async list(
        @Query() { offset = "0", limit = "0", name, type },
        @User() user
    ) {
        const query: any = {
            deletedAt: { $eq: null },
            isSearchable: true,
        };

        if (
            user.type === "operator" &&
            user.role.name.toLowerCase() !== "admin"
        ) {
            query.parent = user._id;
        }

        if (name) {
            query.name = { $regex: new RegExp(name, "i") };
        }

        if (type) {
            query.type = type;
        }

        const total = await this.database.Admin.countDocuments(query);
        const items = await this.database.Admin.find(query)
            .sort("-createdAt")
            .skip(parseInt(offset))
            .limit(parseInt(limit));

        return { total, items };
    }

    @ApiParam({ name: "id" })
    @Get(":id")
    async get(@Param("id") _id: string) {
        const res: any = await this.database.Admin.findById(_id);

        if (res) {
            return res;
        }

        throw new NotFoundException();
    }

    @Post("")
    async create(@Body() body: CreateUserDTO, @User() user) {
        try {
            const newUser = new this.database.Admin();

            Object.assign(newUser, body);

            if (
                user.type === "operator" &&
                user.role.name.toLowerCase() !== "admin"
            ) {
                newUser.parent = user._id;
            }

            await newUser.save();

            return { success: true };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @ApiParam({ name: "id" })
    @Put(":id")
    async update(@Param("id") _id: string, @Body() body: UpdateUserDTO) {
        try {
            const user = await this.database.Admin.findById(_id);

            if (!user) {
                throw new NotFoundException();
            }

            Object.assign(user, body);

            await user.save();

            return { success: true };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @ApiParam({ name: "id" })
    @ApiParam({ name: "status" })
    @Put(":id/:status")
    async updateStatus(
        @Param("id") _id: string,
        @Param("status") status: string
    ) {
        try {
            const user = await this.database.Admin.findById(_id);

            if (!user) {
                throw new NotFoundException();
            }

            switch (status) {
                case "active":
                    user.isDisabled = false;
                    break;
                case "suspend":
                default:
                    user.isDisabled = true;
                    break;
            }

            await user.save();

            return { success: true };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @ApiParam({ name: "id" })
    @Delete(":id")
    async delete(@Param("id") _id: string) {
        try {
            const user = await this.database.Admin.findById(_id);

            user.deletedAt = new Date();

            await user.save();

            return { success: true };
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
