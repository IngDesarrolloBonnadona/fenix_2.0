import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ObservationCancellationCaseService } from '../services/observation-cancellation-case.service';
import { CreateObservationCancellationCaseDto } from '../dto/create-observation-cancellation-case.dto';
import { UpdateObservationCancellationCaseDto } from '../dto/update-observation-cancellation-case.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('observation-cancellation-case')
@Controller('observation-cancellation-case')
@ApiBearerAuth()
export class ObservationCancellationCaseController {
  constructor(
    private readonly observationCancellationCaseService: ObservationCancellationCaseService,
  ) {}

  @Post('/createObservationCancellationCase/:idUser/:idCaseValidate/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createObservationCancellationCase(
    @Param('idUser') idUser: string,
    @Param('idCaseValidate') idCaseValidate: string,
    @Body()
    createObservationCancellationCaseDto: CreateObservationCancellationCaseDto,
  ) {
    return this.observationCancellationCaseService.createObservationCancellationCase(
      createObservationCancellationCaseDto,
      idUser,
      idCaseValidate,
    );
  }

  @Get('/listObservationCancellationCases')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listObservationCancellationCases() {
    return this.observationCancellationCaseService.listObservationCancellationCases();
  }

  @Get('/findObservationCancellationCase/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findObservationCancellationCase(@Param('id') id: number) {
    return this.observationCancellationCaseService.findOneObservationCancellationCase(
      id,
    );
  }

  @Get('/findOneObservationCancellationByCaseValidateId/:CaseValidateId')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findOneObservationCancellationByCaseValidateId(
    @Param('CaseValidateId') CaseValidateId: string,
  ) {
    return this.observationCancellationCaseService.findOneObservationCancellationByCaseValidateId(
      CaseValidateId,
    );
  }

  @Delete('deleteObservationCancellationCase/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteObservationCancellationCase(@Param('id') id: number) {
    return this.observationCancellationCaseService.deleteObservationCancellationCase(
      id,
    );
  }
}
