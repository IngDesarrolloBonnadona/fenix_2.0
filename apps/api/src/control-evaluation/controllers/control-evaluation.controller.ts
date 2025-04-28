import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ControlEvaluationService } from '../services/control-evaluation.service';
import { CreateControlEvaluationDto } from '../dto/create-control-evaluation.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('control-evaluation')
@ApiBearerAuth()
@Controller('control-evaluation')
export class ControlEvaluationController {
  constructor(
    private readonly controlEvaluationService: ControlEvaluationService,
  ) {}

  @Post('/createControlEvaluation')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  create(@Body() createControlEvaluationDto: CreateControlEvaluationDto) {
    return this.controlEvaluationService.createControlEvaluation(
      createControlEvaluationDto,
    );
  }

  @Get('/listControlsEvaluation')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listControlsEvaluation() {
    return this.controlEvaluationService.findAllControlsEvaluation();
  }

  @Get('/findControlsEvaluationByEventAndYear/:eventId/:year')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findControlsEvaluationByEventAndYear(
    @Param('eventId') eventId: number,
    @Param('year') year: number,
  ) {
    return this.controlEvaluationService.findControlsEvaluationByEventAndYear(
      eventId,
      year,
    );
  }

  @Get('/findControlsEvaluationByDate')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findControlsEvaluationByDate(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.controlEvaluationService.findControlsEvaluationByDate(
      startDate,
      endDate,
    );
  }
}
