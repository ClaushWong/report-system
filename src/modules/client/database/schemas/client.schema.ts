import * as mongoose from "mongoose";
import { Type, UserRecord } from "@src/database/template/type.template";
import * as bcrypt from "bcryptjs";

const schema = new mongoose.Schema(
  {
    // fields
    name: Type.String,
    user: Type.ObjectId("User"),

    username: Type.string().required().get(),
    password: Type.String,
    role: Type.ObjectId("Role"),
    isDisabled: Type.BooleanFalse,

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

schema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.set("password", await bcrypt.hash(this.get("password"), 10));
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

export const ClientSchema = schema;
