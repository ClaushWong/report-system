import { IUser } from "@src/modules/core/database/interfaces";
import { IClient } from "@src/modules/client/database/interfaces";

import { IUserRecord } from "@src/database/template/type.interface";

export interface ITransaction {
  _id: any;
  user: string | IUser;
  client: string | IClient;
  category: string;
  date: Date;
  amount: number;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  createdBy: IUserRecord;
  updatedBy: IUserRecord;
  deletedBy: IUserRecord;
}
