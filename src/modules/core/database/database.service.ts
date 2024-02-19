import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser, IRole } from "./interfaces";

@Injectable()
export class DatabaseService {
  public constructor(
    @InjectModel("User") public readonly User: Model<IUser>,
    @InjectModel("Role") public readonly Role: Model<IRole>
  ) {}
}
