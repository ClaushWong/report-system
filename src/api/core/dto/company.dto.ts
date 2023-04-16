import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCompanyDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
