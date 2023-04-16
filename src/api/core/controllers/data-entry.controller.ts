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
    Res,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { DatabaseService } from "@src/database";
import { isEmpty } from "lodash";
import { CreateDataEntryDTO } from "../dto/data-entry.dto";
import * as moment from "moment";
import { CoreAuthGuard } from "@src/auth/guards";
import * as exceljs from "exceljs";

@ApiTags("Core: Data Entry")
@Controller("/api/core/data-entry")
@ApiBearerAuth()
@UseGuards(CoreAuthGuard)
export class DataEntryController {
    constructor(private readonly database: DatabaseService) {}

    @Get("")
    @ApiQuery({ name: "limit" })
    @ApiQuery({ name: "offset" })
    @ApiQuery({ name: "company" })
    @ApiQuery({ name: "dateRange" })
    async list(@Query() { company, dateRange, limit = "0", offset = "0" }) {
        const query: any = {
            deletedAt: { $eq: null },
        };

        if (company) {
            query.company = company;
        }

        if (dateRange) {
            const dates = dateRange.split(",");
            query.date = {
                $gte: moment(dates[0]).startOf("day").toDate(),
                $lte: moment(dates[1]).endOf("day").toDate(),
            };
        }

        const total = await this.database.DataEntry.countDocuments(query);
        const items = await this.database.DataEntry.find(query)
            .populate("company", "name")
            .sort("-date")
            .skip(parseInt(offset))
            .limit(parseInt(limit));

        return { total, items };
    }

    @Get("xls")
    @ApiQuery({ name: "company" })
    @ApiQuery({ name: "dateRange" })
    async exportExcel(@Query() { company, dateRange }, @Res() res) {
        const { items } = await this.list({ company, dateRange });

        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("data");
        worksheet.addRow(["Issued Date", "Company", "Amount (RM)"]);

        for (const r of items) {
            worksheet.addRow([
                moment(r.date).format("DD MMM YYYY"),
                typeof r.company === "string" ? r.company : r.company.name,
                r.amount.toFixed(2),
            ]);
        }

        worksheet
            .getColumn("A")
            .eachCell({ includeEmpty: true }, function (cell, rowNumber) {
                if (rowNumber > 1) {
                    cell.numFmt = "#####";
                }
            });

        try {
            res.set({
                "Content-Type": "application/vnd.ms-excel",
                "Content-Disposition": `attachment; filename="conflict_coverages.xlsx"`,
            });
            res.send(await workbook.xlsx.writeBuffer());
        } finally {
            worksheet.destroy();
        }
    }

    @Post("")
    async create(@Body() body: CreateDataEntryDTO) {
        const company = new this.database.DataEntry();
        Object.assign(company, {
            ...body,
            date: new Date(body.date),
        });
        await company.save();
        return { success: true };
    }

    @ApiParam({ name: "id" })
    @Get(":id")
    async get(@Param("id") _id: string) {
        const company = await this.database.DataEntry.findById(_id);
        if (company) {
            return company;
        }
        throw new NotFoundException();
    }

    @ApiParam({ name: "id" })
    @Put(":id")
    async update(@Param("id") _id: string, @Body() body: CreateDataEntryDTO) {
        const company = await this.database.DataEntry.findById(_id);
        if (company) {
            Object.assign(company, {
                ...body,
                date: new Date(body.date),
            });
            await company.save();
            return { success: true };
        }
        throw new NotFoundException();
    }

    @ApiParam({ name: "id" })
    @Delete(":id")
    async delete(@Param("id") _id: string) {
        const company = await this.database.DataEntry.findById(_id);
        if (company) {
            company.deletedAt = new Date();
            await company.save();
            return { success: true };
        }
        throw new NotFoundException();
    }
}
