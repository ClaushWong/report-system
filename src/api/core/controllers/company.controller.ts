import {
    Body,
    Controller,
    Post,
    Get,
    Query,
    Param,
    NotFoundException,
    Put,
    Delete,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { DatabaseService } from "@src/database";
import { isEmpty } from "lodash";
import { CreateCompanyDTO } from "../dto/company.dto";
import { CoreAuthGuard } from "@src/auth/guards";

@ApiTags("Core: Company")
@Controller("/api/core/company")
@ApiBearerAuth()
@UseGuards(CoreAuthGuard)
export class CompanyController {
    constructor(private readonly database: DatabaseService) {}

    @Get("")
    @ApiQuery({ name: "limit" })
    @ApiQuery({ name: "offset" })
    @ApiQuery({ name: "name" })
    async list(@Query() { name, limit, offset }) {
        const query: any = {
            deletedAt: { $eq: null },
        };

        if (name) {
            query.name = { $regex: new RegExp(name, "i") };
        }

        const total = await this.database.Company.countDocuments(query);
        const items = await this.database.Company.find(query)
            .skip(isEmpty(offset) ? 0 : parseInt(offset))
            .limit(isEmpty(limit) ? 10 : parseInt(limit));

        return { total, items };
    }

    @Post("")
    async create(@Body() body: CreateCompanyDTO) {
        const company = new this.database.Company();
        Object.assign(company, body);
        await company.save();
        return { success: true };
    }

    @ApiParam({ name: "id" })
    @Get(":id")
    async get(@Param("id") _id: string) {
        const company = await this.database.Company.findById(_id);
        if (company) {
            return company;
        }
        throw new NotFoundException();
    }

    @ApiParam({ name: "id" })
    @Put(":id")
    async update(@Param("id") _id: string, @Body() body: CreateCompanyDTO) {
        const company = await this.database.Company.findById(_id);
        if (company) {
            Object.assign(company, body);
            await company.save();
            return { success: true };
        }
        throw new NotFoundException();
    }

    @ApiParam({ name: "id" })
    @Delete(":id")
    async delete(@Param("id") _id: string) {
        const company = await this.database.Company.findById(_id);
        if (company) {
            company.deletedAt = new Date();
            await company.save();
            return { success: true };
        }
        throw new NotFoundException();
    }
}
