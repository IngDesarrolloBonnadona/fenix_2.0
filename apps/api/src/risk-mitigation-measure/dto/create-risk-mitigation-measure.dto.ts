import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRiskMitigationMeasureDto {
  @IsNotEmpty()
  @IsString()
  ris_m_name: string;

  @IsOptional()
  ris_m_event_id: number;
}
