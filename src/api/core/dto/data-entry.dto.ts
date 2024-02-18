import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateDataEntryDTO {
  // !! only for admin to manual create data for user
  @IsOptional()
  @ApiProperty()
  user: string;

  // standard user fields
  @IsNotEmpty()
  @ApiProperty()
  company: string;

  @IsNotEmpty()
  @ApiProperty()
  client: string;

  @IsNotEmpty()
  @ApiProperty()
  date: string;

  @IsNotEmpty()
  @ApiProperty()
  amount: string;
}
