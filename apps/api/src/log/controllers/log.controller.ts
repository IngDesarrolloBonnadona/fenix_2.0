import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LogService } from '../services/log.service';
import { CreateLogDto } from '../dto/create-log.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('log')
@Controller('log')
@ApiBearerAuth()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('/createLog/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.AUDITOR)
  createLog(@Body() createLogDto: CreateLogDto) {
    return this.logService.createLog(
      createLogDto.log_validatedcase_id_fk,
      createLogDto.log_user_id,
      createLogDto.log_ip,
      createLogDto.log_action,
    );
  }

  @Get('/listLogs/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.AUDITOR)
  listLogs() {
    return this.logService.findAllLogs();
  }

  @Get('/findOneLog/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.AUDITOR)
  findOneLog(@Param('id') id: number) {
    return this.logService.findOneLog(id);
  }

  @Delete('/deleteLog/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.AUDITOR)
  deleteLog(@Param('id') id: number) {
    return this.logService.deleteLog(id);
  }
}
