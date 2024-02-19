import * as mongoose from "mongoose";
import { Type, UserRecord } from "@src/database/template/type.template";

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
