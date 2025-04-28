import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateMedicationFluidsResearchInstrumentDto {
  @IsOptional()
  @IsBoolean()
  inst_has_failure: boolean;

  @IsOptional()
  @IsBoolean()
  inst_damage: boolean;

  @IsOptional()
  @IsString()
  inst_associated_with: string;

  @IsOptional()
  @IsString()
  inst_clinical_context: string;

  @IsOptional()
  @IsString()
  inst_other_medication_fluid_type: string;

  @IsOptional()
  @IsString()
  inst_other_medication_administration: string;

  @IsOptional()
  @IsString()
  inst_fluid_name: string;

  @IsOptional()
  inst_fluid_ph: number;

  @IsOptional()
  @IsBoolean()
  inst_adequate_infusion_time: boolean;

  @IsOptional()
  @IsString()
  inst_infusion_time: string;

  @IsOptional()
  @IsBoolean()
  inst_adequate_dilution: boolean;

  @IsOptional()
  @IsString()
  inst_fluid_dilution: string;

  @IsOptional()
  @IsString()
  inst_other_influencing_factors: string;

  @IsOptional()
  inst_delay_time_hours: number;

  @IsOptional()
  inst_delay_time_days: number;

  @IsOptional()
  @IsString()
  inst_other_insufficiently_valued: string;

  @IsOptional()
  @IsString()
  inst_other_medication_fluid_error_factor: string;

  @IsOptional()
  @IsString()
  inst_additional_findings: string;

  @IsOptional()
  @IsBoolean()
  inst_has_care_failures: boolean;

  @IsOptional()
  @IsBoolean()
  inst_has_incorrect_actions: boolean;

  @IsOptional()
  @IsBoolean()
  inst_has_unsafe_actions: boolean;

  @IsOptional()
  @IsString()
  inst_conclusions: string;

  @IsOptional()
  @IsBoolean()
  inst_is_case_preventable: boolean;
}
