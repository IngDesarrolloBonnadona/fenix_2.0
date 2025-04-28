import { PartialType } from '@nestjs/swagger';
import { CreateReasonCancellationCaseDto } from './create-reason-cancellation-case.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateReasonCancellationCaseDto extends PartialType(CreateReasonCancellationCaseDto) {
    @IsOptional()
    @IsBoolean()
    cac_r_status?: boolean;
}
