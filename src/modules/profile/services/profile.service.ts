import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProfileDTO } from "../dtos/profile.dto";
import { ClientService } from "@src/modules/client/services";
import { ProfileDatabaseService } from "../database";

@Injectable()
export class ProfileService {
  constructor(
    private readonly database: ProfileDatabaseService,
    private readonly client: ClientService
  ) {}

  public async formatQuery(
    rawQuery: { limit: string; offset: string; name?: string; client?: string },
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

    if (!!rawQuery?.client) {
      const clients = await this.client.rawList({
        name: { $regex: new RegExp(rawQuery.client, "i") },
        deletedAt: { $eq: null },
      });

      if (clients.length > 0) {
        query.client = { $in: clients.map((client) => client._id) };
      } else {
        returnEmpty = true;
      }
    }

    const pagination = {
      limit: rawQuery?.limit ? parseInt(rawQuery.limit) || 0 : 0,
      offset: rawQuery?.offset ? parseInt(rawQuery.offset) || 0 : 0,
    };

    return { query, pagination, returnEmpty };
  }

  async list(query: any, pagination: any) {
    const total = await this.database.Profile.countDocuments(query);
    const items = await this.database.Profile.find(query)
      .skip(pagination.offset)
      .limit(pagination.limit);

    return { total, items };
  }

  async rawList(query: any) {
    const items = await this.database.Profile.find(query);
    return items;
  }

  async create(body: CreateProfileDTO, user: any) {
    const newClient = await this.database.Profile.create({
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
    const res = await this.database.Profile.findOne({
      _id,
      deletedAt: { $eq: null },
    });

    if (!res) {
      throw new NotFoundException();
    }

    return res;
  }

  async update(_id: string, body: CreateProfileDTO, user: any) {
    const res = await this.database.Profile.findOne({
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
    const res = await this.database.Profile.findOne({
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

  // get the total amount of profiles created
  async getTotal(rawQuery: any) {
    const total = await this.database.Profile.countDocuments({
      deletedAt: { $eq: null },
      ...rawQuery,
    });

    return { total };
  }
}
