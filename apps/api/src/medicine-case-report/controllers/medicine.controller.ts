import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MedicineService } from '../services/medicine.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('medicine')
@ApiBearerAuth()
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get('/listMedicines')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listMedicines() {
    return this.medicineService.findAllMedicines();
  }

  @Get('/findMedicine/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findMedicine(@Param('id') id: number) {
    return this.medicineService.findOneMedicine(id);
  }

  @Get('/findExternalMedicine')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async findExternalMedicine(@Query('medicine') medicine: string) {
    return this.medicineService.findExternalMedidicinesQuery(medicine)
  }

  @Delete('/DeleteMedicine/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  DeleteMedicine(@Param('id') id: number) {
    return this.medicineService.deleteMedicine(id);
  }
}
