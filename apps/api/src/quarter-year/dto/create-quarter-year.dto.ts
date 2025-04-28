import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuarterYearDto {
  @IsNotEmpty()
  @IsString()
  qua_name: string;

  @IsNotEmpty()
  qua_number: number;
}
