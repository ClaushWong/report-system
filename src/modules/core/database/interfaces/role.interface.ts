import { IUserRecord } from "@src/database/template/type.interface";

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
