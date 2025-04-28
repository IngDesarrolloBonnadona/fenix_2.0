import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRiskCauseDto {
  @IsNotEmpty()
  @IsString()
  ris_c_name: string;

  @IsOptional()
  ris_c_event_id: number;
}
