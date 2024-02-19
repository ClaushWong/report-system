import { IRole } from "./role.interface";
import { IUserRecord } from "@src/database/template/type.interface";

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
