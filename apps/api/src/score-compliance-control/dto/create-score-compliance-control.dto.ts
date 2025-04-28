import { IsNotEmpty, IsString } from 'class-validator';

export class CreateScoreComplianceControlDto {
  @IsNotEmpty()
  @IsString()
  sco_name: string;

  @IsNotEmpty()
  sco_percentage: number;
}
