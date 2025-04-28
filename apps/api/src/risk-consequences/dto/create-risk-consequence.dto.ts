import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRiskConsequenceDto {
  @IsNotEmpty()
  @IsString()
  ris_co_name: string;

  @IsOptional()
  ris_co_event_id: number;
}
