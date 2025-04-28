import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVascularAccessResearchInstrumentDto {
  @IsBoolean()
  @IsOptional()
  inst_has_failure: boolean;

  @IsBoolean()
  @IsOptional()
  inst_damage: boolean;

  @IsOptional()
  @IsString()
  inst_clinical_context: string;

  @IsOptional()
  @IsString()
  inst_other_device_type: string;

  @IsOptional()
  @IsString()
  inst_other_damage_type: string;

  @IsOptional()
  @IsString()
  inst_fluid_name: string;

  @IsBoolean()
  @IsOptional()
  inst_is_phlebitis_fluid: boolean;

  @IsOptional()
  inst_fluid_ph: number;

  @IsBoolean()
  @IsOptional()
  inst_adequate_infusion_time: boolean;

  @IsOptional()
  @IsString()
  inst_infusion_time: string;

  @IsBoolean()
  @IsOptional()
  inst_adequate_dilution: boolean;

  @IsOptional()
  @IsString()
  inst_fluid_dilution: string;

  @IsOptional()
  @IsString()
  inst_other_influencing_factors: string;

  @IsOptional()
  @IsString()
  inst_other_failed_measures: string;

  @IsOptional()
  @IsString()
  inst_other_risk_factors: string;

  @IsOptional()
  @IsString()
  inst_venipuncture_technique: string;

  @IsOptional()
  @IsString()
  inst_additional_findings: string;

  @IsBoolean()
  @IsOptional()
  inst_has_care_failures: boolean;

  @IsBoolean()
  @IsOptional()
  inst_has_incorrect_actions: boolean;

  @IsBoolean()
  @IsOptional()
  inst_has_unsafe_actions: boolean;

  @IsOptional()
  @IsString()
  inst_conclusions: string;

  @IsBoolean()
  @IsOptional()
  inst_is_case_preventable: boolean;
}
