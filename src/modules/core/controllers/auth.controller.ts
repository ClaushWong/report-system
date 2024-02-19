import {
  Body,
  Controller,
  Post,
  Get,
  UnauthorizedException,
  Request,
  NotFoundException,
  UseGuards,
  Put,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "@src/auth";
import { LoginDTO, UpdateProfileDTO } from "../dtos/auth.dto";
import { User } from "@src/decorations";
import { CoreAuthGuard } from "@src/auth/guards";
import { UserService } from "@src/modules/core/services";

@ApiTags("Core: Auth")
@Controller("/api/core/auth")
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly user: UserService
  ) {}

  @Post("login")
  async login(@Body() body: LoginDTO) {
    const { username, password } = body;
    const user = await this.auth.core.attempt({ username, password });
    if (user) {
      if (user.isDisabled) {
        throw new UnauthorizedException(
          "Your account is blocked. Please contact the administrator."
        );
      }

      return {
        token: await this.auth.core.sign(user),
        name: user.name,
      };
    }

    throw new UnauthorizedException("Incorrect pin. Please try again.");
  }

  @Get("profile")
  @UseGuards(CoreAuthGuard)
  async profile(@User() user: any) {
    const res = await this.auth.core.get(user._id);
    if (res) {
      return res;
    }
    throw new NotFoundException();
  }

  @Put("update")
  @UseGuards(CoreAuthGuard)
  async updateProfile(@Body() body: UpdateProfileDTO, @User() user: any) {
    return await this.user.update(user._id, body, user);
  }

  @ApiBearerAuth()
  @Get("logout")
  async logout(@Request() request: any) {
    const authorization = request.headers?.["authorization"];
    if (authorization) {
      authorization.replace("Bearer ", "");
    }
    return { success: true };
  }
}
