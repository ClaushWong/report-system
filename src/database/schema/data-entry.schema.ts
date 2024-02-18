import * as mongoose from "mongoose";
import { Type, UserRecord } from "@src/database/template/type.template";
import { IUserRecord } from "../template/type.interface";

import { ICompany } from "./company.schema";
import { IClient } from "./client.schema";
import { IUser } from ".";

const schema = new mongoose.Schema(
  {
    user: Type.ObjectId("User"),
    company: Type.ObjectId("Company"),
    client: Type.ObjectId("Client"),
    date: Type.Date,
    amount: Type.Number,

    // userRecord
    createdBy: UserRecord,
    updatedBy: UserRecord,
    deletedBy: UserRecord,

    // addon timestamps
    deletedAt: Type.Date,
  },
  {
    timestamps: true,
  }
);

export const DataEntrySchema = schema;

export interface IDataEntry {
  _id: any;
  user: string | IUser;
  company: string | ICompany;
  client: string | IClient;
  date: Date;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  createdBy: IUserRecord;
  updatedBy: IUserRecord;
  deletedBy: IUserRecord;
}
