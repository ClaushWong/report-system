import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateClientDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsOptional()
  @ApiProperty()
  user: string;
}

export class UpdateClientDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  username: string;

  @IsOptional()
  @ApiProperty()
  password: string;

  @IsOptional()
  @ApiProperty()
  user: string;
}
