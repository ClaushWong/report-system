import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateRoleDTO {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    type: string;

    @IsOptional()
    @ApiProperty()
    allowedPages: string[];

    @IsOptional()
    @ApiProperty()
    allowedPermissions: string[];
}
