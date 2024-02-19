import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IClient } from "./interfaces";

@Injectable()
export class DatabaseService {
  public constructor(
    @InjectModel("Client") public readonly Client: Model<IClient>
  ) {}
}
