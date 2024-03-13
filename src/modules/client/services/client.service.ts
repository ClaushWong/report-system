import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDTO, UpdateClientDTO } from "../dtos/client.dto";
import { ClientDatabaseService } from "../database";
import { UserService } from "@src/modules/core/services";

@Injectable()
export class ClientService {
  constructor(
    private readonly database: ClientDatabaseService,
    private readonly user: UserService
  ) {}

  public async formatQuery(
    rawQuery: { limit: string; offset: string; name?: string; user?: string },
    user: any
  ) {
    let returnEmpty = false;

    const query: any = {
      deletedAt: { $eq: null },
    };

    if (user?.role?.name?.toLowerCase() !== "admin") {
      query.user = user._id;
    }

    if (!!rawQuery?.name) {
      query.name = { $regex: new RegExp(rawQuery.name, "i") };
    }

    if (!!rawQuery?.user) {
      const users = await this.user.rawList({
        name: { $regex: new RegExp(rawQuery?.user, "i") },
        deletedAt: { $eq: null },
      });

      if (users.length == 0) {
        returnEmpty = true;
      } else {
        query.user = { $in: users.map((user: any) => user._id) };
      }
    }

    const pagination = {
      limit: rawQuery?.limit ? parseInt(rawQuery.limit) || 0 : 0,
      offset: rawQuery?.offset ? parseInt(rawQuery.offset) || 0 : 0,
    };

    return { query, pagination, returnEmpty };
  }

  async rawList(query: any) {
    const items = await this.database.Client.find(query);
    return items;
  }

  async list(query: any, pagination: any) {
    const total = await this.database.Client.countDocuments(query);
    const items = await this.database.Client.find(query)
      .populate("user", "name")
      .skip(pagination.offset)
      .limit(pagination.limit);

    return { total, items };
  }

  async create(body: CreateClientDTO, user: any) {
    const existingClient = await this.database.Client.findOne({
      username: body.username,
      deletedAt: { $eq: null },
    });

    if (!!existingClient) {
      throw new Error("Client already exists");
    }

    const newClient = await this.database.Client.create({
      ...body,
      createdBy: {
        userId: user._id,
        name: user.name,
        type: user.type,
      },
    });

    if (user?.role?.name?.toLowerCase() !== "admin") {
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

  async getByName(name: string) {
    const res = await this.database.Client.findOne({
      name,
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
