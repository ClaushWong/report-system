import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTransactionDTO {
  // !! only for admin to manual create data for user
  @IsOptional()
  @ApiProperty()
  user: string;

  // standard user fields
  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsNotEmpty()
  @ApiProperty()
  client: string;

  @IsNotEmpty()
  @ApiProperty()
  date: string;

  @IsNotEmpty()
  @ApiProperty()
  amount: number;
}

export class PublicTransactionCreateDTO {
  @IsNotEmpty()
  @ApiProperty()
  client: string;

  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsNotEmpty()
  @ApiProperty()
  amount: number;
}
