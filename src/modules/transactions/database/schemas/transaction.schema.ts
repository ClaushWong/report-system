import * as mongoose from "mongoose";
import { Type, UserRecord } from "@src/database/template/type.template";

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

export const TransactionSchema = schema;
