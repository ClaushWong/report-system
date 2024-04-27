import { Injectable, NotFoundException } from "@nestjs/common";
import { TransactionDatabaseService } from "../database";
import * as moment from "moment";
import * as exceljs from "exceljs";
import {
  CreateTransactionDTO,
  PublicTransactionCreateDTO,
} from "../dtos/transaction.dto";
import { MongoDateRange, MongoRegex } from "@src/lib/mongo";
import { ClientService } from "@src/modules/client/services";

@Injectable()
export class TransactionService {
  constructor(
    private readonly database: TransactionDatabaseService,
    private readonly client: ClientService
  ) {}

  public async formatQuery(
    rawQuery: {
      limit: string;
      offset: string;
      remarks?: string;
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

    if (!!rawQuery.remarks) {
      query.remarks = MongoRegex(rawQuery.remarks);
    }

    if (!!rawQuery.dateRange) {
      query.date = MongoDateRange(rawQuery.dateRange);
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
      .populate("client", "name")
      .sort("-date")
      .skip(pagination.offset)
      .limit(pagination.limit);

    return { total, items };
  }

  public async exportExcel(
    rawQuery: { remarks?: string; dateRange?: string },
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
    worksheet.addRow([
      "Issued Date",
      "Client",
      "Category",
      "Remarks",
      "Amount (RM)",
    ]);

    for (const r of items) {
      worksheet.addRow([
        moment(r.date).format("DD MMM YYYY"),
        typeof r.client === "string" ? r.client : r.client.name,
        r.category,
        r.remarks,
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

  public async publicCreate(body: PublicTransactionCreateDTO) {
    const client = await this.client.getByName(body.client);
    if (!client) {
      throw new NotFoundException("Client not found");
    }

    if (!client.canCallPublicApi) {
      throw new NotFoundException("Client not allowed to call public API");
    }

    const transaction = new this.database.Transaction();
    Object.assign(transaction, {
      ...body,
      date: new Date(), // record current datetime
      client: client._id,
      user: client.user, // declared as it is because it had been given the approval to call public api
    });

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
      updatedBy: {
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
  public async getTotal(rawQuery: any) {
    const total = await this.database.Transaction.countDocuments({
      deletedAt: { $eq: null },
      ...rawQuery,
    });

    return { total };
  }

  // get total value of transactions
  public async getTotalValue(rawQuery: any) {
    const total = await this.database.Transaction.aggregate([
      {
        $match: {
          deletedAt: { $eq: null },
          ...rawQuery,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    return total[0]?.total || 0;
  }

  // get grouped client vs total amount
  public async getClientVsTotalAmount(rawQuery: any) {
    const total = await this.database.Transaction.aggregate([
      {
        $match: {
          deletedAt: { $eq: null },
          ...rawQuery,
        },
      },
      {
        $group: {
          _id: "$client",
          total: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "_id",
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $unwind: "$client",
      },
      {
        $project: {
          _id: 0,
          label: "$client.name",
          value: "$total",
        },
      },
    ]);

    return total;
  }

  // get grouped category vs total amount
  public async getCategoryVsTotalAmount(rawQuery: any) {
    const total = await this.database.Transaction.aggregate([
      {
        $match: {
          deletedAt: { $eq: null },
          ...rawQuery,
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id",
          value: "$total",
        },
      },
    ]);

    return total;
  }
}
