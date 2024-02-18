import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser, ICompany, IDataEntry, IRole, IClient } from "./schema";

@Injectable()
export class DatabaseService {
  public constructor(
    @InjectModel("User") public readonly User: Model<IUser>,
    @InjectModel("Client") public readonly Client: Model<IClient>,
    @InjectModel("Company") public readonly Company: Model<ICompany>,
    @InjectModel("DataEntry") public readonly DataEntry: Model<IDataEntry>,
    @InjectModel("Role") public readonly Role: Model<IRole>
  ) {}
}
