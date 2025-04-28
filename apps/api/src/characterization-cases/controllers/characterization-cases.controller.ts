import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CharacterizationCasesService } from '../services/characterization-cases.service';
import { CreateCharacterizationCaseDto } from '../dto/create-characterization-case.dto';
import { UpdateCharacterizationCaseDto } from '../dto/update-characterization-case.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('characterization-case')
@Controller('characterization-case')
@ApiBearerAuth()
export class CharacterizationCasesController {
  constructor(
    private readonly characterizationCasesService: CharacterizationCasesService,
  ) {}

  @Post('/createCharacterizationCase/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  create(@Body() createCharacterizationCaseDto: CreateCharacterizationCaseDto) {
    return this.characterizationCasesService.createCharacterization(
      createCharacterizationCaseDto,
    );
  }

  @Get('/listCharacterizationsCase/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listCharacterizations() {
    return this.characterizationCasesService.findAllCharacterizations();
  }

  @Get('/findCharacterizationCase/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findCharacterization(@Param('id') id: number) {
    return this.characterizationCasesService.findOneCharacterization(id);
  }

  @Patch('/updateCharacterizationCase/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateCharacterization(
    @Param('id') id: number,
    @Body() updateCharacterizationCaseDto: UpdateCharacterizationCaseDto,
  ) {
    return this.characterizationCasesService.updateCharacterization(
      id,
      updateCharacterizationCaseDto,
    );
  }

  @Delete('/deleteCharacterizationCase/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteCharacterization(@Param('id') id: number) {
    return this.characterizationCasesService.deleteCharacterization(id);
  }
}
