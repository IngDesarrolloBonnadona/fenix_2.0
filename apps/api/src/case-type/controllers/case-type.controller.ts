import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CaseTypeService } from '../services/case-type.service';
import { CreateCaseTypeDto } from '../dto/create-case-type.dto';
import { UpdateCaseTypeDto } from '../dto/update-case-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('case-type')
@Controller('case-type')
@ApiBearerAuth()
export class CaseTypeController {
  constructor(private readonly caseTypeService: CaseTypeService) {}

  @Post('/createCaseType/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createCaseType(@Body() createCaseTypeDto: CreateCaseTypeDto) {
    return this.caseTypeService.createCaseType(createCaseTypeDto);
  }

  @Get('/listCaseTypes/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listCaseTypes() {
    return this.caseTypeService.findAllCaseTypes();
  }

  @Get('/findCaseType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findCaseType(@Param('id') id: number) {
    return this.caseTypeService.findOneCaseType(id);
  }

  @Patch('/updateCaseType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateCaseType(
    @Param('id') id: number,
    @Body() updateCaseTypeDto: UpdateCaseTypeDto,
  ) {
    return this.caseTypeService.updateCaseType(id, updateCaseTypeDto);
  }

  @Delete('/deleteCaseType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteCaseType(@Param('id') id: number) {
    return this.caseTypeService.deleteCaseType(id);
  }
}
