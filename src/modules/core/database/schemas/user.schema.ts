import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import { Type, UserRecord } from "@src/database/template/type.template";

const schema = new mongoose.Schema(
  {
    username: Type.string().unique().required().get(),
    name: Type.String,
    isDisabled: Type.BooleanFalse,
    type: Type.String,
    role: Type.ObjectId("Role"),
    parent: Type.ObjectId("User"),
    password: Type.String,
    isSearchable: Type.BooleanTrue,

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

export const UserSchema = schema;
