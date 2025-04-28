import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeverityClasificationService } from '../services/severity-clasification.service';
import { CreateSeverityClasificationDto } from '../dto/create-severity-clasification.dto';
import { UpdateSeverityClasificationDto } from '../dto/update-severity-clasification.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('severity-clasification')
@Controller('severity-clasification')
@ApiBearerAuth()
export class SeverityClasificationController {
  constructor(
    private readonly severityClasificationService: SeverityClasificationService,
  ) {}

  @Post('/createSeverityClasification/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createSeverityClasification(
    @Body() createSeverityClasificationDto: CreateSeverityClasificationDto,
  ) {
    return this.severityClasificationService.createSeverityClasification(
      createSeverityClasificationDto,
    );
  }

  @Get('/listSeverityClasifications/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listSeverityClasifications() {
    return this.severityClasificationService.findAllSeverityClasifications();
  }

  @Get('findSeverityClasification/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findSeverityClasification(@Param('id') id: number) {
    return this.severityClasificationService.findOneSeverityClasification(id);
  }

  @Patch('/updateSeverityClasification/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateSeverityClasification(
    @Param('id') id: number,
    @Body() updateSeverityClasificationDto: UpdateSeverityClasificationDto,
  ) {
    return this.severityClasificationService.updateSeverityClasification(
      id,
      updateSeverityClasificationDto,
    );
  }

  @Delete('/deleteSeverityClasification/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteSeverityClasification(@Param('id') id: number) {
    return this.severityClasificationService.deleteSeverityClasification(id);
  }
}
