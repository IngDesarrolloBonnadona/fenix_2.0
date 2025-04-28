import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateReportAnalystAssignmentDto {
  @IsNotEmpty()
  @IsUUID()
  ana_validatedcase_id_fk: string;

  @IsNotEmpty()
  @IsString()
  ana_positionname: string;

  @IsOptional()
  @IsString()
  ana_useranalyst_id: string;

  @IsString()
  @IsOptional()
  ana_justifications: string;
}
