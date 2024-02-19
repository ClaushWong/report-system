import * as mongoose from "mongoose";
import { Type, UserRecord } from "@src/database/template/type.template";

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
