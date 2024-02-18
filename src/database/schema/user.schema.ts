import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import { IRole } from "./role.schema";
import { Type, UserRecord } from "@src/database/template/type.template";
import { IUserRecord } from "@src/database/template/type.interface";

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

export interface IUser {
  _id: any;
  username: string;
  password: string;
  name: string;
  type: string;
  isDisabled: boolean;
  isSearchable: boolean;
  role: string | IRole;
  parent: string | IUser;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  createdBy: IUserRecord;
  updatedBy: IUserRecord;
  deletedBy: IUserRecord;
}
