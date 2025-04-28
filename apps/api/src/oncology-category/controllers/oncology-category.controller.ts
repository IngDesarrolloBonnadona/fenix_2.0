import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OncologyCategoryService } from '../services/oncology-category.service';
import { CreateOncologyCategoryDto } from '../dto/create-oncology-category.dto';
import { UpdateOncologyCategoryDto } from '../dto/update-oncology-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('oncology-category')
@Controller('oncology-category')
@ApiBearerAuth()
export class OncologyCategoryController {
  constructor(
    private readonly oncologyCategoryService: OncologyCategoryService,
  ) {}

  @Post('/createOncologyCategory/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createOncologyCategory(
    @Body() createOncologyCategoryDto: CreateOncologyCategoryDto,
  ) {
    return this.oncologyCategoryService.createOncologyCategory(
      createOncologyCategoryDto,
    );
  }

  @Get('/listOncologyCategories/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listOncologyCategories() {
    return this.oncologyCategoryService.findAllOncologyCategories();
  }

  @Get('/findOncologyCategory/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findOncologyCategory(@Param('id') id: number) {
    return this.oncologyCategoryService.findOneOncologyCategory(id);
  }

  @Patch('/updateOncologyCategory/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateOncologyCategory(
    @Param('id') id: number,
    @Body() updateOncologyCategoryDto: UpdateOncologyCategoryDto,
  ) {
    return this.oncologyCategoryService.updateoncologyCategory(
      id,
      updateOncologyCategoryDto,
    );
  }

  @Delete('/deleteOncologyCategory/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteOncologyCategory(@Param('id') id: number) {
    return this.oncologyCategoryService.deleteOncologyCategory(id);
  }
}
