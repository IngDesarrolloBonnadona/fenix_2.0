import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RiskFactorService } from '../services/risk-factor.service';
import { CreateRiskFactorDto } from '../dto/create-risk-factor.dto';
import { UpdateRiskFactorDto } from '../dto/update-risk-factor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { RiskFactor } from '../entities/risk-factor.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('risk-factor')
@Controller('risk-factor')
@ApiBearerAuth()
export class RiskFactorController {
  constructor(private readonly riskFactorService: RiskFactorService) {}

  @Post('/createRiskFactor/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createRiskFactor(@Body() createRiskFactorDto: CreateRiskFactorDto) {
    return this.riskFactorService.createRiskFactor(createRiskFactorDto);
  }

  @Get('/listRiskFactors/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listRiskFactors() {
    return this.riskFactorService.findAllRiskFactors();
  }

  @Get('/findRiskFactor/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findRiskFactor(@Param('id') id: number) {
    return this.riskFactorService.findOneRiskFactor(id);
  }

  @Patch('/updateRiskFactor/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateRiskFactor(
    @Param('id') id: number,
    @Body() updateRiskFactorDto: UpdateRiskFactorDto,
  ) {
    return this.riskFactorService.updateRiskFactor(id, updateRiskFactorDto);
  }

  @Delete('/deleteRiskFactor/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteRiskFactor(@Param('id') id: number) {
    return this.riskFactorService.deleteRiskFactor(id);
  }
}
