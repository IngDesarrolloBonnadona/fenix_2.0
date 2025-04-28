import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoleResponseTimeService } from '../services/role-response-time.service';
import { CreateRoleResponseTimeDto } from '../dto/create-role-response-time.dto';
import { UpdateRoleResponseTimeDto } from '../dto/update-role-response-time.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('role-response-time')
@Controller('role-response-time')
@ApiBearerAuth()
export class RoleResponseTimeController {
  constructor(
    private readonly roleResponseTimeService: RoleResponseTimeService,
  ) {}

  @Post('/createRoleResponseTime/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createRoleResponseTime(
    @Body() createRoleResponseTimeDto: CreateRoleResponseTimeDto,
  ) {
    return this.roleResponseTimeService.createRoleResponseTime(
      createRoleResponseTimeDto,
    );
  }

  @Get('/listRoleResponseTimes/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listRoleResponseTimes() {
    return this.roleResponseTimeService.findAllRoleResponseTimes();
  }

  @Get('/findRoleResponseTime/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findRoleResponseTime(@Param('id') id: number) {
    return this.roleResponseTimeService.findOnefindAllRoleResponseTime(id);
  }

  @Patch('/updateRoleResponseTime/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateCreateRoleResponseTime(
    @Param('id') id: number,
    @Body() updateCaseResponseTimeDto: UpdateRoleResponseTimeDto,
  ) {
    return this.roleResponseTimeService.updateRoleResponseTime(
      id,
      updateCaseResponseTimeDto,
    );
  }

  @Delete('/deleteRoleResponseTime/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteCreateRoleResponseTime(@Param('id') id: number) {
    return this.roleResponseTimeService.deleteRoleResponseTime(id);
  }
}
