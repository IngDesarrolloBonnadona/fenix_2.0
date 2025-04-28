import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RiskTypeService } from '../services/risk-type.service';
import { CreateRiskTypeDto } from '../dto/create-risk-type.dto';
import { UpdateRiskTypeDto } from '../dto/update-risk-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('risk-type')
@Controller('risk-type')
@ApiBearerAuth()
export class RiskTypeController {
  constructor(private readonly riskTypeService: RiskTypeService) {}

  @Post('/createRisktype/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createRisktype(@Body() createRiskTypeDto: CreateRiskTypeDto) {
    return this.riskTypeService.createRiskType(createRiskTypeDto);
  }

  @Get('/listRisktypes/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listRisktypes() {
    return this.riskTypeService.findAllRiskTypes();
  }

  @Get('/findRisktype/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findRisktype(@Param('id') id: number) {
    return this.riskTypeService.findOneRiskType(id);
  }

  @Patch('/updateRisktype/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateRisktype(
    @Param('id') id: number,
    @Body() updateRiskTypeDto: UpdateRiskTypeDto,
  ) {
    return this.riskTypeService.updateRiskType(id, updateRiskTypeDto);
  }

  @Delete('/deleteRisktype/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteRisktype(@Param('id') id: number) {
    return this.riskTypeService.deleteRiskType(id);
  }
}
