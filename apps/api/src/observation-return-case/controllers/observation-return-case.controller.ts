import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ObservationReturnCaseService } from '../services/observation-return-case.service';
import { CreateObservationReturnCaseDto } from '../dto/create-observation-return-case.dto';
import { UpdateObservationReturnCaseDto } from '../dto/update-observation-return-case.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('observation-return-case')
@Controller('observation-return-case')
@ApiBearerAuth()
export class ObservationReturnCaseController {
  constructor(
    private readonly observationReturnCaseService: ObservationReturnCaseService,
  ) {}

  @Post('/createObservationReturnCase/:idUser/:idCaseValidate/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createObservationReturnCase(
    @Param('idUser') idUser: string,
    @Param('idCaseValidate') idCaseValidate: string,
    @Body() createObservationReturnCaseDto: CreateObservationReturnCaseDto,
  ) {
    return this.observationReturnCaseService.createObservationReturnCase(
      createObservationReturnCaseDto,
      idUser,
      idCaseValidate,
    );
  }

  @Get('/listObservationReturnCases')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listObservationReturnCases() {
    return this.observationReturnCaseService.findAllObservationReturnCase();
  }

  @Get('/findObservationReturnCase/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findObservationReturnCase(@Param('id') id: number) {
    return this.observationReturnCaseService.findOneObservationReturnCase(id);
  }

  @Get('/findOneObservationReturnByCaseValidateId/:CaseValidateId')
  // @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findOneObservationReturnByCaseValidateId(
    @Param('CaseValidateId') CaseValidateId: string,
  ) {
    return this.observationReturnCaseService.findOneObservationReturnByCaseValidateId(
      CaseValidateId,
    );
  }

  @Patch('/updateObservationReturnCase/:id/:idCaseValidate/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateObservationReturnCase(
    @Param('id') id: number,
    @Body() updateObservationReturnCaseDto: UpdateObservationReturnCaseDto,
  ) {
    return this.observationReturnCaseService.updateObservationReturnCase(
      id,
      updateObservationReturnCaseDto,
    );
  }

  @Delete('deleteObservationReturnCase/:id/:idCaseValidate/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteObservationReturnCase(@Param('id') id: number) {
    return this.observationReturnCaseService.deleteObservationReturnCase(id);
  }
}
