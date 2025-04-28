import { Injectable } from '@nestjs/common';
import { CreateOptionResearchCategoryDto } from '../dto/create-option_research_category.dto';
import { UpdateOptionResearchCategoryDto } from '../dto/update-option_research_category.dto';

@Injectable()
export class OptionResearchCategoryService {
  create(createOptionResearchCategoryDto: CreateOptionResearchCategoryDto) {
    return 'This action adds a new optionResearchCategory';
  }

  findAll() {
    return `This action returns all optionResearchCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optionResearchCategory`;
  }

  update(
    id: number,
    updateOptionResearchCategoryDto: UpdateOptionResearchCategoryDto,
  ) {
    return `This action updates a #${id} optionResearchCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} optionResearchCategory`;
  }
}
