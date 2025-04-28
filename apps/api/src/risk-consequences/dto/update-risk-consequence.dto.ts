import { PartialType } from '@nestjs/swagger';
import { CreateRiskConsequenceDto } from './create-risk-consequence.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRiskConsequenceDto extends PartialType(
  CreateRiskConsequenceDto,
) {
  @IsOptional()
  @IsBoolean()
  ris_co_status: boolean;
}
