import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PatientDto } from '../dto/patient.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('patient')
@Controller('patient')
@ApiBearerAuth()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/infoPatient')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  infoPatient(@Body() patientDto: PatientDto) {
    return this.patientService.getPatient(patientDto);
  }
}
