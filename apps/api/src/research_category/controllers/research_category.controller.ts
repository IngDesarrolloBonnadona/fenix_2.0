import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResearchCategoryService } from '../services/research_category.service';
import { CreateResearchCategoryDto } from '../dto/create-research_category.dto';
import { UpdateResearchCategoryDto } from '../dto/update-research_category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('research-category')
@Controller('research-category')
@ApiBearerAuth()
export class ResearchCategoryController {
  constructor(
    private readonly researchCategoryService: ResearchCategoryService,
  ) {}

  @Post('/createResearchCategory/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createResearchCategory(
    @Body() createResearchCategoryDto: CreateResearchCategoryDto,
  ) {
    return this.researchCategoryService.createResearchCategory(
      createResearchCategoryDto,
    );
  }

  @Get('/listResearchCategories')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listResearchCategories() {
    return this.researchCategoryService.listResearchCategories();
  }

  @Get('/findOneResearchCategory/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findOneResearchCategory(@Param('id') id: number) {
    return this.researchCategoryService.findOneResearchCategory(id);
  }

  @Get('/findResearchCategoryByResearchInstrumentId/:idInstrument')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findResearchCategoryByResearchInstrumentId(
    @Param('idInstrument') idInstrument: number,
  ) {
    return this.researchCategoryService.findResearchCategoryByResearchInstrumentId(
      idInstrument,
    );
  }

  @Patch('/updateResearchCategory/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateResearchCategory(
    @Param('id') id: number,
    @Body() updateResearchCategoryDto: UpdateResearchCategoryDto,
  ) {
    return this.researchCategoryService.updateResearchCategory(
      id,
      updateResearchCategoryDto,
    );
  }

  @Delete('/deleteResearchCategory/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteResearchCategory(@Param('id') id: number) {
    return this.researchCategoryService.deleteResearchCategory(id);
  }
}
