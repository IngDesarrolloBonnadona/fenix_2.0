import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateOtherCasesResearchInstrumentDto {
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
  inst_clinical_record_findings: string;

  @IsOptional()
  @IsString()
  inst_healthcare_staff_version: string;

  @IsOptional()
  @IsString()
  inst_patient_report: string;

  @IsOptional()
  @IsString()
  inst_service_documentation_evidence: string;

  @IsOptional()
  @IsString()
  inst_work_resources_description: string;

  @IsOptional()
  @IsString()
  inst_human_resources_availability: string;

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
  @IsString()
  inst_conclusions: string;

  @IsOptional()
  @IsBoolean()
  inst_is_case_preventable: boolean;
}
