import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateObservationCancellationCaseDto {
  @IsNotEmpty()
  @IsNumber()
  cac_o_reasoncancellation_id_fk: number;
  
  @IsNotEmpty()
  @IsString()
  cac_o_observation: string;
}
