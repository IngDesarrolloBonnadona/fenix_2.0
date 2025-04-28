import { PartialType } from '@nestjs/swagger';
import { CreateScoreComplianceControlDto } from './create-score-compliance-control.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateScoreComplianceControlDto extends PartialType(
  CreateScoreComplianceControlDto,
) {
  @IsOptional()
  @IsBoolean()
  sco_status?: boolean;
}
