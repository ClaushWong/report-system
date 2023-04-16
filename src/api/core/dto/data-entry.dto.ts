import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateDataEntryDTO {
    @IsNotEmpty()
    @ApiProperty()
    company: string;

    @IsNotEmpty()
    @ApiProperty()
    date: string;

    @IsNotEmpty()
    @ApiProperty()
    amount: string;
}
