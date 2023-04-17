import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IAdmin, ICompany, IDataEntry, IRole } from "./schema";

@Injectable()
export class DatabaseService {
    public constructor(
        @InjectModel("Admin") public readonly Admin: Model<IAdmin>,
        @InjectModel("Company") public readonly Company: Model<ICompany>,
        @InjectModel("DataEntry") public readonly DataEntry: Model<IDataEntry>,
        @InjectModel("Role") public readonly Role: Model<IRole>
    ) {}
}
