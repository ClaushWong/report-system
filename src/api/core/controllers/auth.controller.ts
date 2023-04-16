import {
    Body,
    Controller,
    Post,
    Get,
    UnauthorizedException,
    Request,
    NotFoundException,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "@src/auth";
import { PosLogin } from "../dto/login.dto";
import { User } from "@src/decorations";
import { CoreAuthGuard } from "@src/auth/guards";

@ApiTags("Core: Auth")
@Controller("/api/core/auth")
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Get("test")
    async test() {
        return {
            hi: true,
        };
    }

    @Post("login")
    async login(@Body() body: PosLogin) {
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
    async profile(@User() user) {
        const res = await this.auth.core.get(user._id);
        if (res) {
            return res;
        }
        throw new NotFoundException();
    }

    @ApiBearerAuth()
    @Get("logout")
    async logout(@Request() request) {
        const authorization = request.headers?.["authorization"];
        if (authorization) {
            const token = authorization.replace("Bearer ", "");
        }
        return { success: true };
    }
}
