import { Injectable, NotFoundException } from "@nestjs/common";
import { TransactionDatabaseService } from "../database";
import * as moment from "moment";
import * as exceljs from "exceljs";
import { CreateTransactionDTO } from "../dtos/transaction.dto";
import { ProfileService } from "@src/modules/profile/services";

@Injectable()
export class TransactionService {
  constructor(
    private readonly database: TransactionDatabaseService,
    private readonly profile: ProfileService
  ) {}

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
      const companies = await this.profile.rawList({
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
    const total = await this.database.Transaction.countDocuments(query);
    const items = await this.database.Transaction.find(query)
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

  public async create(body: CreateTransactionDTO, user: any) {
    const transaction = new this.database.Transaction();
    Object.assign(transaction, {
      ...body,
      date: new Date(body.date),
      createdBy: {
        userId: user._id,
        name: user.name,
        type: user.type,
      },
    });
    if (user.role?.name !== "admin") {
      transaction.user = user._id;
    }
    await transaction.save();
    return { success: true };
  }

  public async get(_id: string) {
    const transaction = await this.database.Transaction.findOne({
      _id,
      deletedAt: { $eq: null },
    });
    if (!transaction) {
      throw new NotFoundException();
    }
    return transaction;
  }

  public async update(_id: string, body: CreateTransactionDTO, user: any) {
    const transaction = await this.database.Transaction.findOne({
      _id,
      deletedAt: { $eq: null },
    });

    if (!transaction) {
      throw new NotFoundException();
    }

    Object.assign(transaction, {
      ...body,
      date: new Date(body.date),
      updatedAt: {
        userId: user._id,
        name: user.name,
        type: user.type,
      },
    });
    await transaction.save();
    return { success: true };
  }

  public async delete(_id: string, user: any) {
    const transaction = await this.database.Transaction.findOne({
      _id,
      deletedAt: { $eq: null },
    });

    if (!transaction) {
      throw new NotFoundException();
    }

    transaction.deletedAt = new Date();
    transaction.deletedBy = {
      userId: user._id,
      name: user.name,
      type: user.type,
    };
    await transaction.save();
    return { success: true };
  }

  // get total amount of transactions
  async getTotal(rawQuery: any) {
    const total = await this.database.Transaction.countDocuments({
      deletedAt: { $eq: null },
      ...rawQuery,
    });

    return { total };
  }
}
