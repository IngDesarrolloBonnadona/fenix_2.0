import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RiskCausesService } from '../services/risk-causes.service';
import { CreateRiskCauseDto } from '../dto/create-risk-cause.dto';
import { UpdateRiskCauseDto } from '../dto/update-risk-cause.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('risk-cause')
@Controller('risk-cause')
@ApiBearerAuth()
export class RiskCausesController {
  constructor(private readonly riskCausesService: RiskCausesService) {}

  @Post('/createRiskCause/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createRiskCause(@Body() createRiskCauseDto: CreateRiskCauseDto) {
    return this.riskCausesService.createRiskCause(createRiskCauseDto);
  }

  @Get('/listRiskCauses/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listRiskCauses() {
    return this.riskCausesService.findAllRiskCause();
  }

  @Get('/findRiskCause/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findRiskCause(@Param('id') id: number) {
    return this.riskCausesService.findOneRiskCause(id);
  }

  @Get('/findRiskCauseByEventId/:eventId')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findRiskCauseByEventId(@Param('eventId') eventId: number) {
    return this.riskCausesService.findRiskCauseByEventId(eventId);
  }

  @Patch('/updateRiskCause/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateRiskCause(
    @Param('id') id: number,
    @Body() updateRiskCauseDto: UpdateRiskCauseDto,
  ) {
    return this.riskCausesService.updateRiskCause(id, updateRiskCauseDto);
  }

  @Delete('/deleteRiskCause/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteRiskCause(@Param('id') id: number) {
    return this.riskCausesService.deleteRiskCause(id);
  }
}
