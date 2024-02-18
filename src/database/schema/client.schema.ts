import * as mongoose from "mongoose";
import { Type, UserRecord } from "@src/database/template/type.template";
import { IUserRecord } from "@src/database/template/type.interface";

import { IUser } from "./user.schema";

const schema = new mongoose.Schema(
  {
    // fields
    name: Type.String,
    user: Type.ObjectId("User"),

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

export const ClientSchema = schema;

export interface IClient {
  _id: string;
  name: string;
  user: string | IUser;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  createdBy: IUserRecord;
  updatedBy: IUserRecord;
  deletedBy: IUserRecord;
}
