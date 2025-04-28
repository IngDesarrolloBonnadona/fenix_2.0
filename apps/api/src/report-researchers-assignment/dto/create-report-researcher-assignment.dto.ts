import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateReportResearcherAssignmentDto {
  @IsNotEmpty()
  @IsUUID()
  res_validatedcase_id_fk: string;

  @IsNotEmpty()
  @IsString()
  res_positionname: string;

  @IsOptional()
  @IsString()
  res_userresearch_id: string;

  @IsString()
  @IsOptional()
  res_justifications: string;
}
