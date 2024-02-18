import * as mongoose from "mongoose";
import { Type, UserRecord } from "@src/database/template/type.template";
import { IUserRecord } from "../template/type.interface";
import { IClient } from "./client.schema";

const schema = new mongoose.Schema(
  {
    // fields
    name: Type.String,
    client: Type.ObjectId("Client"),

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

export const CompanySchema = schema;

export interface ICompany {
  _id: any;
  name: string;
  client: string | IClient;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  createdBy: IUserRecord;
  updatedBy: IUserRecord;
  deletedBy: IUserRecord;
}
