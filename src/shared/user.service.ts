import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { DatabaseService } from "@src/database";
import { CreateUserDTO, UpdateUserDTO } from "@src/api/core/dto/user.dto";
import { UpdateProfileDTO } from "@src/api/core/dto/auth.dto";

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService) {}

  public async formatQuery(
    rawQuery: { offset: string; limit: string; type?: string; name?: string },
    user: any
  ) {
    const query: any = {
      deletedAt: { $eq: null },
      isSearchable: true,
    };

    if (user.type === "operator" && user.role.name.toLowerCase() !== "admin") {
      query.parent = user._id;
    }

    if (rawQuery.name) {
      query.name = { $regex: new RegExp(rawQuery.name, "i") };
    }

    if (rawQuery.type) {
      query.type = rawQuery.type;
    }

    const pagination = {
      limit: rawQuery.limit ? parseInt(rawQuery.limit) || 0 : 0,
      offset: rawQuery.offset ? parseInt(rawQuery.offset) || 0 : 0,
    };

    return { query, pagination };
  }

  public async list(query: any, pagination: { limit: number; offset: number }) {
    const total = await this.database.User.countDocuments(query);
    const items = await this.database.User.find(query)
      .sort("-createdAt")
      .skip(pagination.offset)
      .limit(pagination.limit);

    return { total, items };
  }

  public async get(_id: string) {
    const res: any = await this.database.User.findById(_id);

    if (res) {
      return res;
    }

    throw new NotFoundException();
  }

  public async create(body: CreateUserDTO, user: any) {
    try {
      const newUser = new this.database.User();

      Object.assign(newUser, body);

      if (
        user.type === "operator" &&
        user.role.name.toLowerCase() !== "admin"
      ) {
        newUser.parent = user._id;
      }

      newUser.createdBy = {
        userId: user._id,
        name: user.name,
        type: user.type,
      };

      await newUser.save();

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async update(
    _id: string,
    body: UpdateUserDTO | UpdateProfileDTO,
    user: any
  ) {
    try {
      const userRecord = await this.database.User.findById(_id);

      if (!userRecord) {
        throw new NotFoundException();
      }

      Object.assign(userRecord, body);

      userRecord.updatedBy = {
        userId: user._id,
        name: user.name,
        type: user.type,
      };

      await userRecord.save();

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async updateActive(_id: string, user: any) {
    try {
      const userRecord = await this.database.User.findById(_id);

      if (!userRecord) {
        throw new NotFoundException();
      }

      userRecord.isDisabled = false;

      userRecord.updatedBy = {
        userId: user._id,
        name: user.name,
        type: user.type,
      };

      await userRecord.save();

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async updateSuspend(_id: string, user: any) {
    try {
      const userRecord = await this.database.User.findById(_id);

      if (!userRecord) {
        throw new NotFoundException();
      }

      userRecord.isDisabled = true;

      userRecord.updatedBy = {
        userId: user._id,
        name: user.name,
        type: user.type,
      };

      await userRecord.save();

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async delete(_id: string, user: any) {
    try {
      const userRecord = await this.database.User.findById(_id);

      if (!userRecord) {
        throw new NotFoundException();
      }

      userRecord.deletedAt = new Date();

      userRecord.deletedBy = {
        userId: user._id,
        name: user.name,
        type: user.type,
      };

      await userRecord.save();

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
