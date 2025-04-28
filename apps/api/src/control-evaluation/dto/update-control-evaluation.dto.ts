import { PartialType } from '@nestjs/swagger';
import { CreateControlEvaluationDto } from './create-control-evaluation.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateControlEvaluationDto extends PartialType(
  CreateControlEvaluationDto,
) {
  @IsOptional()
  @IsBoolean()
  con_e_status?: boolean;
}
