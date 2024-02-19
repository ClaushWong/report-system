import { IClient } from "@src/modules/client/database/interfaces";
import { IUser } from "@src/modules/core/database/interfaces";
import { IUserRecord } from "@src/database/template/type.interface";

export interface IProfile {
  _id: any;
  name: string;
  client: string | IClient;
  user: string | IUser;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  createdBy: IUserRecord;
  updatedBy: IUserRecord;
  deletedBy: IUserRecord;
}
