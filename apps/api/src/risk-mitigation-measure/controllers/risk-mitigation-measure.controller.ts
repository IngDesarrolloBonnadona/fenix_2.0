import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RiskMitigationMeasureService } from '../services/risk-mitigation-measure.service';
import { CreateRiskMitigationMeasureDto } from '../dto/create-risk-mitigation-measure.dto';
import { UpdateRiskMitigationMeasureDto } from '../dto/update-risk-mitigation-measure.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('risk-mitigation-measure')
@Controller('risk-mitigation-measure')
@ApiBearerAuth()
export class RiskMitigationMeasureController {
  constructor(
    private readonly riskMitigationMeasureService: RiskMitigationMeasureService,
  ) {}

  @Post('/createRiskMitigationMeasure/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createRiskMitigationMeasure(
    @Body() createRiskMitigationMeasureDto: CreateRiskMitigationMeasureDto,
  ) {
    return this.riskMitigationMeasureService.createRiskMitigationMeasure(
      createRiskMitigationMeasureDto,
    );
  }

  @Get('/listRiskMitigationMeasures/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listRiskMitigationMeasures() {
    return this.riskMitigationMeasureService.findAllRiskMitigationMeasure();
  }

  @Get('/findRiskMitigationMeasure/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findRiskMitigationMeasure(@Param('id') id: number) {
    return this.riskMitigationMeasureService.findOneRiskMitigationMeasure(id);
  }

  @Get('/findRiskMitigationMeasureByEventId/:eventId')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findRiskCauseByEventId(@Param('eventId') eventId: number) {
    return this.riskMitigationMeasureService.findRiskMitigationMeasureByEventId(
      eventId,
    );
  }

  @Patch('/updateRiskMitigationMeasure/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateRiskMitigationMeasure(
    @Param('id') id: number,
    @Body() updateRiskMitigationMeasureDto: UpdateRiskMitigationMeasureDto,
  ) {
    return this.riskMitigationMeasureService.updateRiskMitigationMeasure(
      id,
      updateRiskMitigationMeasureDto,
    );
  }

  @Delete('/deleteRiskMitigationMeasure/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteRiskMitigationMeasure(@Param('id') id: number) {
    return this.riskMitigationMeasureService.deleteRiskMitigationMeasure(id);
  }
}
