import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AUTH_JWT_SECRET, AUTH_JWT_EXPIRATION } from "../../config";
import { AuthService } from "../auth.service";

@Injectable()
export class CoreAuthStrategy extends PassportStrategy(Strategy, "core-auth") {
  constructor(private readonly auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: false,
      secretOrKey: AUTH_JWT_SECRET,
      expiresIn: `${AUTH_JWT_EXPIRATION}`,
    });
  }

  async validate(payload: any) {
    return await this.auth.core.get(payload._id);
  }
}
