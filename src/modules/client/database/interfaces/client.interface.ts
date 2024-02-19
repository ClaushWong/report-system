import { IUserRecord } from "@src/database/template/type.interface";
import { IRole, IUser } from "@src/modules/core/database/interfaces";

export interface IClient {
  _id: string;
  name: string;
  user: string | IUser;
  username: string;
  password: string;
  role: string | IRole;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  createdBy: IUserRecord;
  updatedBy: IUserRecord;
  deletedBy: IUserRecord;
}
