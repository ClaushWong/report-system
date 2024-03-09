import * as mongoose from "mongoose";
import { Type, UserRecord } from "@src/database/template/type.template";

const schema = new mongoose.Schema(
  {
    user: Type.ObjectId("User"),
    client: Type.ObjectId("Client"),
    date: Type.Date,
    category: Type.String,
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
