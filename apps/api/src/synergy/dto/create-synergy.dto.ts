import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSynergyDto {
  @IsNotEmpty()
  @IsUUID()
  syn_validatedcase_id_fk: string;

  @IsOptional()
  @IsString()
  syn_observations: string;

  @IsNotEmpty()
  @IsString()
  syn_analystidnumber: string;

  @IsOptional()
  @IsString()
  syn_patientcontent: string;

  @IsOptional()
  @IsString()
  syn_possiblefaults: string;

  @IsOptional()
  @IsString()
  syn_consequences: string;

  @IsOptional()
  @IsString()
  syn_clinicalmanagement: string;

  @IsOptional()
  @IsString()
  syn_whomwasnotified: string;
}
