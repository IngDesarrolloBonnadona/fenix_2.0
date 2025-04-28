import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReasonCancellationCaseDto {
    @IsNotEmpty()
    @IsString()
    cac_r_cause: string;
}
