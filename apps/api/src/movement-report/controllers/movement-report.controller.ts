import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovementReportService } from '../services/movement-report.service';
import { CreateMovementReportDto } from '../dto/create-movement-report.dto';
import { UpdateMovementReportDto } from '../dto/update-movement-report.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('movement-report')
@Controller('movement-report')
@ApiBearerAuth()
export class MovementReportController {
  constructor(private readonly movementReportService: MovementReportService) {}

  @Post('/createMovementReport/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createMovementReport(
    @Body() createMovementReportDto: CreateMovementReportDto,
  ) {
    return this.movementReportService.createMovementReport(
      createMovementReportDto,
    );
  }

  @Get('/listMovementReports/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listMovementReport() {
    return this.movementReportService.findAllMovementReports();
  }

  @Get('/findMovementReport/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findMovementReport(@Param('id') id: number) {
    return this.movementReportService.findOneMovementReport(id);
  }

  @Patch('/updateMovementReport/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateMovementReport(
    @Param('id') id: number,
    @Body() updateMovementReportDto: UpdateMovementReportDto,
  ) {
    return this.movementReportService.updateMovementReport(
      id,
      updateMovementReportDto,
    );
  }

  @Delete('/deleteMovementReport/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteMovementReport(@Param('id') id: number) {
    return this.movementReportService.deleteMovementReport(id);
  }
}
