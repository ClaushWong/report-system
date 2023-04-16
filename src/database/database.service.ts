import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IAdmin, ICompany } from "./schema";
import { IDataEntry } from "./schema/data-entry.schema";

@Injectable()
export class DatabaseService {
    public constructor(
        @InjectModel("Admin") public readonly Admin: Model<IAdmin>,
        @InjectModel("Company") public readonly Company: Model<ICompany>,
        @InjectModel("DataEntry") public readonly DataEntry: Model<IDataEntry>
    ) {}
}
