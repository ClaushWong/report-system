import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "@src/database";
import * as moment from "moment";
import * as exceljs from "exceljs";
import { CreateDataEntryDTO } from "@src/api/core/dto/data-entry.dto";

@Injectable()
export class DataEntryService {
  constructor(private readonly database: DatabaseService) {}

  public async formatQuery(
    rawQuery: {
      limit: string;
      offset: string;
      company?: string;
      dateRange?: string;
    },
    user: any
  ) {
    let returnEmpty = false;

    const query: any = {
      deletedAt: { $eq: null },
    };

    if (user?.role?.name?.toLowerCase() !== "admin") {
      query.user = user._id;
    }

    if (!!rawQuery.company) {
      const companies = await this.database.Company.find({
        name: { $regex: new RegExp(rawQuery.company, "i") },
        deletedAt: { $eq: null },
      });

      if (companies.length > 0) {
        query.company = { $in: companies.map((c) => c._id) };
      } else {
        returnEmpty = true;
      }
    }

    if (!!rawQuery.dateRange) {
      const dates = rawQuery.dateRange.split(",");
      query.date = {
        $gte: moment(dates[0]).startOf("day").toDate(),
        $lte: moment(dates[1]).endOf("day").toDate(),
      };
    }

    const pagination = {
      limit: !!rawQuery.limit ? parseInt(rawQuery.limit) || 0 : 0,
      offset: !!rawQuery.offset ? parseInt(rawQuery.offset) || 0 : 0,
    };

    return { query, pagination, returnEmpty };
  }

  public async list(query: any, pagination: any) {
    const total = await this.database.DataEntry.countDocuments(query);
    const items = await this.database.DataEntry.find(query)
      .populate("company", "name")
      .populate("client", "name")
      .sort("-date")
      .skip(pagination.offset)
      .limit(pagination.limit);

    return { total, items };
  }

  public async exportExcel(
    rawQuery: { company?: string; dateRange?: string },
    user: any,
    res: any
  ) {
    const { query, pagination, returnEmpty } = await this.formatQuery(
      { ...rawQuery, limit: "0", offset: "0" },
      user
    );

    if (returnEmpty) {
      throw new NotFoundException("No data found");
    }

    const { items } = await this.list(query, pagination);

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("data");
    worksheet.addRow(["Issued Date", "Client", "Company", "Amount (RM)"]);

    for (const r of items) {
      worksheet.addRow([
        moment(r.date).format("DD MMM YYYY"),
        typeof r.client === "string" ? r.client : r.client.name,
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

  public async create(body: CreateDataEntryDTO, user: any) {
    const dataEntry = new this.database.DataEntry();
    Object.assign(dataEntry, {
      ...body,
      date: new Date(body.date),
      createdBy: {
        userId: user._id,
        name: user.name,
        type: user.type,
      },
    });
    if (user.role?.name !== "admin") {
      dataEntry.user = user._id;
    }
    await dataEntry.save();
    return { success: true };
  }

  public async get(_id: string) {
    const dataEntry = await this.database.DataEntry.findOne({
      _id,
      deletedAt: { $eq: null },
    });
    if (!dataEntry) {
      throw new NotFoundException();
    }
    return dataEntry;
  }

  public async update(_id: string, body: CreateDataEntryDTO, user: any) {
    const dataEntry = await this.database.DataEntry.findOne({
      _id,
      deletedAt: { $eq: null },
    });

    if (!dataEntry) {
      throw new NotFoundException();
    }

    Object.assign(dataEntry, {
      ...body,
      date: new Date(body.date),
      updatedAt: {
        userId: user._id,
        name: user.name,
        type: user.type,
      },
    });
    await dataEntry.save();
    return { success: true };
  }

  public async delete(_id: string, user: any) {
    const dataEntry = await this.database.DataEntry.findOne({
      _id,
      deletedAt: { $eq: null },
    });

    if (!dataEntry) {
      throw new NotFoundException();
    }

    dataEntry.deletedAt = new Date();
    dataEntry.deletedBy = {
      userId: user._id,
      name: user.name,
      type: user.type,
    };
    await dataEntry.save();
    return { success: true };
  }
}
