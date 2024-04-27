import { Controller, Get } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Controller("/api/core/helpers")
export class HelperController {
  constructor(private readonly database: DatabaseService) {}

  @Get("auth")
  async getAuth() {
    return await this.database.User.find({ deletedAt: { $eq: null } });
  }
}
