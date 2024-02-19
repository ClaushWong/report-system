import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IProfile } from "./interfaces";

@Injectable()
export class DatabaseService {
  public constructor(
    @InjectModel("Profile") public readonly Profile: Model<IProfile>
  ) {}
}
