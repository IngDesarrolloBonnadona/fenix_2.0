import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DamageTypeService } from '../services/damage-type.service';
import { CreateDamageTypeDto } from '../dto/create-damage-type.dto';
import { UpdateDamageTypeDto } from '../dto/update-damage-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('damage-type')
@Controller('damage-type')
@ApiBearerAuth()
export class DamageTypeController {
  constructor(private readonly damageTypeService: DamageTypeService) {}

  @Post('/createDamageType/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createDamageType(@Body() createDamageTypeDto: CreateDamageTypeDto) {
    return this.damageTypeService.createDamageType(createDamageTypeDto);
  }

  @Get('/listDamageTypes/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listDamageTypes() {
    return this.damageTypeService.findAllDamageType();
  }

  @Get('/findDamageType/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findDamageType(@Param('id') id: number) {
    return this.damageTypeService.findOneDamageType(id);
  }

  @Patch('/updateDamageType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateDamageType(
    @Param('id') id: number,
    @Body() updateDamageTypeDto: UpdateDamageTypeDto,
  ) {
    return this.damageTypeService.updateDamageType(id, updateDamageTypeDto);
  }

  @Delete('/deleteDamageType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteDamageType(@Param('id') id: number) {
    return this.damageTypeService.deleteDamageType(id);
  }
}
