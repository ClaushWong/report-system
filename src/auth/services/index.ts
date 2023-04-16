import { IAdmin } from "../../database/schema";
import * as bcrypt from "bcryptjs";

export interface IAuthRepo {
  get(id: string): Promise<IAdmin>;

  attempt(credential: Credential | any): Promise<IAdmin>;

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
