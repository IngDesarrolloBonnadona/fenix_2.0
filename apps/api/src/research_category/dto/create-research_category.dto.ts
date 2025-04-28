import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateOptionResearchCategoryDto } from 'src/option_research_category/dto/create-option_research_category.dto';

export class CreateResearchCategoryDto {
  @IsString()
  @IsNotEmpty()
  cat_r_name: string;

  @IsNotEmpty()
  cat_r_research_instrument_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionResearchCategoryDto)
  optionResearchCategory: CreateOptionResearchCategoryDto[];
}
