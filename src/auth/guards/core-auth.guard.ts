import {
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AUTH_SINGLE_ONLY } from "@src/config";
import { AuthService } from "../auth.service";

@Injectable()
export class CoreAuthGuard extends AuthGuard("core-auth") {
  constructor(private readonly auth: AuthService) {
    super();
  }

  private static getToken(context: ExecutionContext) {
    const authorization = context.switchToHttp().getRequest()?.headers?.[
      "authorization"
    ];
    return authorization?.replace("Bearer ", "");
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const token = CoreAuthGuard.getToken(context);
    if (!token) {
      throw new UnauthorizedException(`banned token`);
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    super.handleRequest(err, user, info, context);
    const token = CoreAuthGuard.getToken(context);
    if (token !== user?._token && AUTH_SINGLE_ONLY === "true") {
      throw new HttpException(`duplicate sign in`, 409);
    }
    return user;
  }
}
