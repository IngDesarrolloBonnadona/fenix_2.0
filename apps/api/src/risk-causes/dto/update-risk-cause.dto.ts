import { PartialType } from '@nestjs/swagger';
import { CreateRiskCauseDto } from './create-risk-cause.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRiskCauseDto extends PartialType(CreateRiskCauseDto) {
  @IsOptional()
  @IsBoolean()
  ris_c_status: boolean;
}
