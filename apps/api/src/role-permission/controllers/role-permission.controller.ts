import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolePermissionService } from '../services/role-permission.service';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dto/update-role-permission.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('role-permission')
@Controller('role-permission')
@ApiBearerAuth()
export class RolePermissionController {
  constructor(private readonly roleService: RolePermissionService) {}

  @Post('/createRole/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createRole(@Body() createRoleDto: CreateRolePermissionDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get('/listRoles/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listRoles() {
    return this.roleService.findAllRoles();
  }

  @Get('/findRole/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findRole(@Param('id') id: number) {
    return this.roleService.findOneRole(id);
  }

  @Get('/findRoleByName/:roleName')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findRoleByName(@Param('roleName') roleName: string) {
    return this.roleService.findRoleByName(roleName);
  }

  @Patch('/updateRole/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateRole(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRolePermissionDto,
  ) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete('/deleteRole/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
