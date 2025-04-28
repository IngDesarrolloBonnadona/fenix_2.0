import { PartialType } from '@nestjs/swagger';
import { CreateProbabilityOcurrenceDto } from './create-probability-ocurrence.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateProbabilityOcurrenceDto extends PartialType(
  CreateProbabilityOcurrenceDto,
) {
  @IsOptional()
  @IsBoolean()
  prob_o_status?: boolean;
}
