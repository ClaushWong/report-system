import { IUser } from "@src/modules/core/database/interfaces";
import * as bcrypt from "bcryptjs";

export interface IAuthRepo {
  get(id: string): Promise<IUser>;

  attempt(credential: Credential | any): Promise<IUser>;

  sign(user: any): Promise<string> | string;
}

export const VerifyPassword = (password, user: any) =>
  !!user && bcrypt.compare(password, user.password);

export interface PosCredential {
  pin: string;
}

export interface CoreCredential {
  username: string;
  password: string;
}
