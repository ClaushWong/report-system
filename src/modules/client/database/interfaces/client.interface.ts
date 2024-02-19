import { IUserRecord } from "@src/database/template/type.interface";
import { IUser } from "@src/modules/core/database/interfaces";

export interface IClient {
  _id: string;
  name: string;
  user: string | IUser;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  createdBy: IUserRecord;
  updatedBy: IUserRecord;
  deletedBy: IUserRecord;
}
