import { Injectable, Logger } from "@nestjs/common";
import { ADMIN } from "./data/seed";
import { DatabaseService } from "../database";

@Injectable()
export class SeederService {
  logger = new Logger("SEEDER");

  constructor(private database: DatabaseService) {}

  async data() {
    for (const user of ADMIN) {
      const { username, password, name } = user;
      if ((await this.database.User.countDocuments({ username })) === 0) {
        const r = new this.database.User();
        r.username = username;
        r.password = password;
        r.name = name;
        await r.save();
        this.logger.log(`created admin - ${r.username}`);
      }
    }
  }
}
