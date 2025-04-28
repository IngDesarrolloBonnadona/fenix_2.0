import { PartialType } from '@nestjs/swagger';
import { CreateImpactDto } from './create-impact.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateImpactDto extends PartialType(CreateImpactDto) {
  @IsOptional()
  @IsBoolean()
  imp_status?: boolean;
}
