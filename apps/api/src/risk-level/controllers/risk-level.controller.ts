import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RiskLevelService } from '../services/risk-level.service';
import { CreateRiskLevelDto } from '../dto/create-risk-level.dto';
import { UpdateRiskLevelDto } from '../dto/update-risk-level.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('risk-level')
@Controller('risk-level')
@ApiBearerAuth()
export class RiskLevelController {
  constructor(private readonly riskLevelService: RiskLevelService) {}

  @Post('/createRiskLevel/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createRiskLevel(@Body() createRiskLevelDto: CreateRiskLevelDto) {
    return this.riskLevelService.createRiskLevel(createRiskLevelDto);
  }

  @Get('/listRiskLevels/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listRiskLevel() {
    return this.riskLevelService.findAllRiskLevel();
  }

  @Get('/findRiskLevel/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findRiskLevel(@Param('id') id: number) {
    return this.riskLevelService.findOneRiskLevel(id);
  }

  @Patch('/updateRiskLevel/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateRiskLevel(
    @Param('id') id: number,
    @Body() updateRiskLevelDto: UpdateRiskLevelDto,
  ) {
    return this.riskLevelService.updateRiskLevel(id, updateRiskLevelDto);
  }

  @Delete('/deleteRiskLevel/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteRiskLevel(@Param('id') id: number) {
    return this.riskLevelService.deleteRiskLevel(id);
  }
}
