import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CoreDatabaseService } from "../database";
import { CreateRoleDTO } from "../dtos/role.dto";

@Injectable()
export class RoleService {
  constructor(private readonly database: CoreDatabaseService) {}

  public async formatQuery(rawQuery: {
    limit: string;
    offset: string;
    name?: string;
    type?: string;
  }) {
    const query: any = {
      deletedAt: { $eq: null },
    };

    if (!!rawQuery?.name) {
      query.name = { $regex: new RegExp(rawQuery.name, "i") };
    }

    if (!!rawQuery?.type) {
      query.type = rawQuery.type;
    }

    const pagination = {
      limit: rawQuery?.limit ? parseInt(rawQuery.limit) || 0 : 0,
      offset: rawQuery?.offset ? parseInt(rawQuery.offset) || 0 : 0,
    };

    return { query, pagination };
  }

  public async list(query: any, pagination: any) {
    const total = await this.database.Role.countDocuments(query);
    const items = await this.database.Role.find(query)
      .skip(pagination.offset)
      .limit(pagination.limit);

    return { total, items };
  }

  public async get(_id: string) {
    const res = await this.database.Role.findOne({
      _id,
      deletedAt: { $eq: null },
    });

    if (!res) {
      throw new NotFoundException("Role not found");
    }

    return res;
  }

  public async create(body: CreateRoleDTO, user: any) {
    try {
      const role = new this.database.Role();

      Object.assign(role, {
        ...body,
        createdBy: {
          userId: user._id,
          name: user.name,
          type: user.type,
        },
      });

      await role.save();

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async update(_id: string, body: CreateRoleDTO, user: any) {
    try {
      const role = await this.database.Role.findOne({
        _id,
        deletedAt: { $eq: null },
      });

      if (!role) {
        throw new NotFoundException();
      }

      Object.assign(role, {
        ...body,
        updatedBy: {
          userId: user._id,
          name: user.name,
          type: user.type,
        },
      });

      await role.save();

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async delete(_id: string, user: any) {
    const role = await this.database.Role.findOne({
      _id,
      deletedAt: { $eq: null },
    });

    if (!role) {
      throw new NotFoundException();
    }

    role.deletedAt = new Date();
    role.deletedBy = {
      userId: user._id,
      name: user.name,
      type: user.type,
    };
    await role.save();
    return { success: true };
  }
}
