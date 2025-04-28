import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OptionResearchCategoryService } from '../services/option_research_category.service';
import { CreateOptionResearchCategoryDto } from '../dto/create-option_research_category.dto';
import { UpdateOptionResearchCategoryDto } from '../dto/update-option_research_category.dto';

@Controller('option-research-category')
export class OptionResearchCategoryController {
  constructor(
    private readonly optionResearchCategoryService: OptionResearchCategoryService,
  ) {}

  @Post()
  create(
    @Body() createOptionResearchCategoryDto: CreateOptionResearchCategoryDto,
  ) {
    return this.optionResearchCategoryService.create(
      createOptionResearchCategoryDto,
    );
  }

  @Get()
  findAll() {
    return this.optionResearchCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionResearchCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOptionResearchCategoryDto: UpdateOptionResearchCategoryDto,
  ) {
    return this.optionResearchCategoryService.update(
      +id,
      updateOptionResearchCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionResearchCategoryService.remove(+id);
  }
}
