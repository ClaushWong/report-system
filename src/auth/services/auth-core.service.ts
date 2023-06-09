import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@src/database";
import { CoreCredential, IAuthRepo } from "./index";
import { IAdmin } from "@src/database/schema";
import * as bcrypt from "bcryptjs";

import * as jwt from "jsonwebtoken";
import { AUTH_JWT_SECRET, AUTH_JWT_EXPIRATION } from "@src/config";
import { ObjectId } from "mongodb";
import { IGNORE_FIELD } from "@src/constants";

@Injectable()
export class AuthCoreService implements IAuthRepo {
    constructor(private readonly database: DatabaseService) {}

    async get(id: string): Promise<IAdmin> {
        return await this.database.Admin.findOne({
            _id: new ObjectId(id),
            deletedAt: { $eq: null },
        })
            .select(IGNORE_FIELD)
            .populate("role");
    }

    async attempt({ username, password }: CoreCredential): Promise<IAdmin> {
        const user: any = await this.database.Admin.findOne({
            username,
        }).populate("role");
        if (user && bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async sign(user: IAdmin): Promise<string> {
        const { _id, name, role, type } = user;
        const token = jwt.sign(
            {
                _id,
                name,
                role,
                type,
            },
            AUTH_JWT_SECRET,
            { expiresIn: `${AUTH_JWT_EXPIRATION}` }
        );
        // await this.database.User.findByIdAndUpdate(user._id, { _token: token });
        return token;
    }
}
