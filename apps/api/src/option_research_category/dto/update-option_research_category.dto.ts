import { PartialType } from '@nestjs/swagger';
import { CreateOptionResearchCategoryDto } from './create-option_research_category.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateOptionResearchCategoryDto extends PartialType(
  CreateOptionResearchCategoryDto,
) {}
