import { PartialType } from '@nestjs/swagger';
import { CreateVascularAccessResearchInstrumentDto } from './create-vascular-access-research-instrument.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateVascularAccessResearchInstrumentDto extends PartialType(
  CreateVascularAccessResearchInstrumentDto,
) {
  @IsOptional()
  @IsBoolean()
  inst_status?: boolean;
}
