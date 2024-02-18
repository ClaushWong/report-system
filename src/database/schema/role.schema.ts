import * as mongoose from "mongoose";
import { IUserRecord } from "../template/type.interface";
import { Type, UserRecord } from "../template/type.template";

const schema = new mongoose.Schema(
  {
    name: Type.String,
    type: Type.String,
    allowedPages: [Type.String],
    allowedPermissions: [Type.String],

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

export const RoleSchema = schema;

export interface IRole {
  _id: any;
  name: string;
  type: string;
  allowedPages: string[];
  allowedPermissions: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  createdBy: IUserRecord;
  updatedBy: IUserRecord;
  deletedBy: IUserRecord;
}
