import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProbabilityOcurrenceDto {
  @IsNotEmpty()
  prob_o_level: number;

  @IsNotEmpty()
  @IsString()
  prob_o_name: string;

  @IsString()
  @IsOptional()
  prob_o_description: string;
}
