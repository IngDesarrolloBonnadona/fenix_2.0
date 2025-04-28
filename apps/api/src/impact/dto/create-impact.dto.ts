import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateImpactDto {
  @IsNotEmpty()
  imp_level: number;

  @IsNotEmpty()
  @IsString()
  imp_name: string;

  @IsString()
  @IsOptional()
  imp_health_impact: string;

  @IsString()
  @IsOptional()
  imp_business_impact: string;
}
