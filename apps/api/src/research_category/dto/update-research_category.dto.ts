import { PartialType } from '@nestjs/swagger';
import { CreateResearchCategoryDto } from './create-research_category.dto';

export class UpdateResearchCategoryDto extends PartialType(CreateResearchCategoryDto) {}
