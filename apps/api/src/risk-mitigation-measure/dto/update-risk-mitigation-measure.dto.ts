import { PartialType } from '@nestjs/swagger';
import { CreateRiskMitigationMeasureDto } from './create-risk-mitigation-measure.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRiskMitigationMeasureDto extends PartialType(
  CreateRiskMitigationMeasureDto,
) {
  @IsOptional()
  @IsBoolean()
  ris_m_status: boolean;
}
