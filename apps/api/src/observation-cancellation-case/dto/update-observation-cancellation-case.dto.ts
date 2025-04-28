import { PartialType } from '@nestjs/swagger';
import { CreateObservationCancellationCaseDto } from './create-observation-cancellation-case.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateObservationCancellationCaseDto extends PartialType(
  CreateObservationCancellationCaseDto,
) {
  @IsOptional()
  @IsBoolean()
  rec_o_status?: boolean;
}
