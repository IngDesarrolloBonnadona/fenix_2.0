import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UnitService } from '../services/unit.service';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('unit')
@Controller('unit')
@ApiBearerAuth()
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post('/createUnit/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createUnit(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.createUnit(createUnitDto);
  }

  @Get('/listUnits/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listUnits() {
    return this.unitService.findAllUnits();
  }

  @Get('/findUnit/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findUnit(@Param('id') id: number) {
    return this.unitService.findOneUnit(id);
  }

  @Patch('/updateUnit/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateUnit(@Param('id') id: number, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitService.updateUnit(id, updateUnitDto);
  }

  @Delete('/deleteUnit/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteUnit(@Param('id') id: number) {
    return this.unitService.deleteUnit(id);
  }
}
