import { Injectable } from "@nestjs/common";
import { AuthCoreService } from "./services/auth-core.service";

@Injectable()
export class AuthService {
  constructor(public readonly core: AuthCoreService) {}
}
