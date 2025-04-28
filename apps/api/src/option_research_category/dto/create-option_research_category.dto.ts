import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOptionResearchCategoryDto {
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  cat_o_name: string;

  @IsNotEmpty()
  cat_o_research_category_id: number;

  @IsOptional()
  @IsBoolean()
  cat_o_status: boolean;
}
