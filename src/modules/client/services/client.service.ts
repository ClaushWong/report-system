import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDTO, UpdateClientDTO } from "../dtos/client.dto";
import { ClientDatabaseService } from "../database";

@Injectable()
export class ClientService {
  constructor(private readonly database: ClientDatabaseService) {}

  public async formatQuery(
    rawQuery: { limit: string; offset: string; name?: string; type?: string },
    user: any
  ) {
    const query: any = {
      deletedAt: { $eq: null },
    };

    if (user?.role?.name?.toLowerCase() !== "admin") {
      query.user = user._id;
    }

    if (!!rawQuery?.name) {
      query.name = { $regex: new RegExp(rawQuery.name, "i") };
    }

    if (!!rawQuery?.type) {
      query.type = { $regex: new RegExp(rawQuery.type, "i") };
    }

    const pagination = {
      limit: rawQuery?.limit ? parseInt(rawQuery.limit) || 0 : 0,
      offset: rawQuery?.offset ? parseInt(rawQuery.offset) || 0 : 0,
    };

    return { query, pagination };
  }

  async list(query: any, pagination: any) {
    const total = await this.database.Client.countDocuments(query);
    const items = await this.database.Client.find(query)
      .skip(pagination.offset)
      .limit(pagination.limit);

    return { total, items };
  }

  async create(body: CreateClientDTO, user: any) {
    const newClient = await this.database.Client.create({
      ...body,
      createdBy: {
        userId: user._id,
        name: user.name,
        type: user.type,
      },
    });

    if (user?.role?.name !== "admin") {
      newClient.user = user._id;
    }

    await newClient.save();

    return { success: true };
  }

  async get(_id: string) {
    const res = await this.database.Client.findOne({
      _id,
      deletedAt: { $eq: null },
    });

    if (!res) {
      throw new NotFoundException();
    }

    return res;
  }

  async update(_id: string, body: UpdateClientDTO, user: any) {
    const res = await this.database.Client.findOne({
      _id,
      deletedAt: { $eq: null },
    });

    if (!res) {
      throw new NotFoundException();
    }

    Object.assign(res, body);

    res.updatedBy = {
      userId: user._id,
      name: user.name,
      type: user.type,
    };

    await res.save();

    return { success: true };
  }

  async delete(_id: string, user: any) {
    const res = await this.database.Client.findOne({
      _id,
      deletedAt: { $eq: null },
    });

    if (!res) {
      throw new NotFoundException();
    }

    res.deletedAt = new Date();
    res.deletedBy = {
      userId: user._id,
      name: user.name,
      type: user.type,
    };

    await res.save();
    return { success: true };
  }
}
