import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RiskConsequencesService } from '../services/risk-consequences.service';
import { CreateRiskConsequenceDto } from '../dto/create-risk-consequence.dto';
import { UpdateRiskConsequenceDto } from '../dto/update-risk-consequence.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('risk-consequences')
@Controller('risk-consequences')
@ApiBearerAuth()
export class RiskConsequencesController {
  constructor(
    private readonly riskConsequencesService: RiskConsequencesService,
  ) {}

  @Post('/createRiskConsequence/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createRiskConsequence(
    @Body() createRiskConsequenceDto: CreateRiskConsequenceDto,
  ) {
    return this.riskConsequencesService.createRiskConsequence(
      createRiskConsequenceDto,
    );
  }

  @Get('/listRiskConsequences/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listRiskConsequences() {
    return this.riskConsequencesService.findAllRiskConsequence();
  }

  @Get('/findRiskConsequence/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findRiskConsequence(@Param('id') id: number) {
    return this.riskConsequencesService.findOneRiskConsequence(id);
  }

  @Get('/findRiskConsequenceByEventId/:eventId')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findRiskConsequenceByEventId(@Param('eventId') eventId: number) {
    return this.riskConsequencesService.findRiskConsequenceByEventId(eventId);
  }

  @Patch('/updateRiskConsequence/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateRiskConsequence(
    @Param('id') id: number,
    @Body() updateRiskConsequenceDto: UpdateRiskConsequenceDto,
  ) {
    return this.riskConsequencesService.updateRiskConsequence(
      id,
      updateRiskConsequenceDto,
    );
  }

  @Delete('/deleteRiskConsequence/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteRiskConsequence(@Param('id') id: number) {
    return this.riskConsequencesService.deleteRiskConsequence(id);
  }
}
