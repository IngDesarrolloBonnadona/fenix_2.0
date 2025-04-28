import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateFallsResearchInstrumentDto {
  @IsOptional()
  @IsBoolean()
  inst_has_failure: boolean;

  @IsOptional()
  @IsBoolean()
  inst_damage: boolean;

  @IsOptional()
  @IsString()
  inst_clinical_context: string;

  @IsOptional()
  @IsString()
  inst_other_influencing_factors: string;

  @IsOptional()
  inst_fall_risk_level_id: number;

  @IsOptional()
  @IsString()
  inst_other_failed_measures: string;

  @IsOptional()
  inst_risk_factors_id: number;

  @IsOptional()
  @IsString()
  inst_other_risk_factors: string;

  @IsOptional()
  @IsString()
  inst_additional_findings: string;

  @IsOptional()
  @IsBoolean()
  inst_has_care_failures: boolean;

  @IsOptional()
  inst_safety_barriers_id: number;

  @IsOptional()
  @IsBoolean()
  inst_has_incorrect_actions: boolean;

  @IsOptional()
  @IsBoolean()
  inst_has_unsafe_actions: boolean;

  @IsOptional()
  inst_evaluation_fall_category_id: number;

  @IsOptional()
  @IsString()
  inst_conclusions: string;

  @IsOptional()
  @IsBoolean()
  inst_is_case_preventable: boolean;
}
