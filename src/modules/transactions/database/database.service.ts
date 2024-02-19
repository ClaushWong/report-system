import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ITransaction } from "./interfaces";

@Injectable()
export class DatabaseService {
  public constructor(
    @InjectModel("Transaction") public readonly Transaction: Model<ITransaction>
  ) {}
}
