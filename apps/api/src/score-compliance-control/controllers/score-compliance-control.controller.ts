import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScoreComplianceControlService } from '../services/score-compliance-control.service';
import { CreateScoreComplianceControlDto } from '../dto/create-score-compliance-control.dto';
import { UpdateScoreComplianceControlDto } from '../dto/update-score-compliance-control.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('score-compliance-control')
@Controller('score-compliance-control')
@ApiBearerAuth()
export class ScoreComplianceControlController {
  constructor(
    private readonly scoreComplianceControlService: ScoreComplianceControlService,
  ) {}

  @Post('/createScoreComplianceControl/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createScoreComplianceControl(
    @Body() createScoreComplianceControlDto: CreateScoreComplianceControlDto,
  ) {
    return this.scoreComplianceControlService.createScoreComplianceControl(
      createScoreComplianceControlDto,
    );
  }

  @Get('/listScoreComplianceControl/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listScoreComplianceControl() {
    return this.scoreComplianceControlService.findAllScoreComplianceControl();
  }

  @Get('/findScoreComplianceControl/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findScoreComplianceControl(@Param('id') id: string) {
    return this.scoreComplianceControlService.findOneScoreComplianceControl(
      +id,
    );
  }

  @Patch('/updateScoreComplianceControl/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateScoreComplianceControl(
    @Param('id') id: string,
    @Body() updateScoreComplianceControlDto: UpdateScoreComplianceControlDto,
  ) {
    return this.scoreComplianceControlService.updateScoreComplianceControl(
      +id,
      updateScoreComplianceControlDto,
    );
  }

  @Delete('/deleteScoreComplianceControl/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteScoreComplianceControl(@Param('id') id: number) {
    return this.scoreComplianceControlService.deleteScoreComplianceControl(id);
  }
}
