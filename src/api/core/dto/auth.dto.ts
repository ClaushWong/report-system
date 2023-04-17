import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;
}

export class UpdateProfileDTO {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsOptional()
    @ApiProperty()
    password: string;
}
