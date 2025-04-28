import { PartialType } from '@nestjs/swagger';
import { CreateQuarterYearDto } from './create-quarter-year.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateQuarterYearDto extends PartialType(CreateQuarterYearDto) {
  @IsOptional()
  @IsBoolean()
  qua_c_status: boolean;
}
