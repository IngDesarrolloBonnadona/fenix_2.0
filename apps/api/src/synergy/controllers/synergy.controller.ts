import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Ip,
} from '@nestjs/common';
import { SynergyService } from '../services/synergy.service';
import { CreateSynergyDto } from '../dto/create-synergy.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateSynergyDto } from '../dto/update-synergy.dto';

@ApiTags('synergy')
@Controller('synergy')
@ApiBearerAuth()
export class SynergyController {
  constructor(private readonly synergyService: SynergyService) {}

  @Post('/createSynergy/:idValidator/:emailAnalyst/:fullNameAnalyst/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createSynergy(
    @Body() createSynergyDto: CreateSynergyDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
    @Param('emailAnalyst') emailAnalyst: string,
    @Param('fullNameAnalyst') fullNameAnalyst: string,
  ) {
    return this.synergyService.createSynergy(
      createSynergyDto,
      clientIp,
      idValidator,
      emailAnalyst,
      fullNameAnalyst,
    );
  }

  @Get('/listSynergies/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listSynergies() {
    return this.synergyService.findAllSynergy();
  }

  @Get('/findSynergy/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findSynergy(@Param('id') id: number) {
    return this.synergyService.findOneSynergy(id);
  }

  @Patch('/resolutionSynergy/:id/:idValidator/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  resolutionSynergy(
    @Param('id') id: number,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
    @Body() resolutionSynergyDto: UpdateSynergyDto,
  ) {
    return this.synergyService.resolutionSynergy(
      id,
      clientIp,
      idValidator,
      resolutionSynergyDto,
    );
  }

  @Delete('/deleteSynergy/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteSynergy(@Param('id') id: number) {
    return this.synergyService.deleteSynergy(id);
  }
}
