import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateControlEvaluationDto {
  @IsNotEmpty()
  con_e_event_id: number;

  @IsOptional()
  con_e_probability_ocurrence_id: number;

  @IsOptional()
  con_e_impact_id: number;

  @IsNotEmpty()
  con_e_year: number;

  @IsOptional()
  con_e_quarter_year_id: number;

  @IsOptional()
  con_e_materialized_case: number;

  @IsOptional()
  con_e_compliance_control: number;

  @IsOptional()
  con_e_is_inherent: boolean;
}
