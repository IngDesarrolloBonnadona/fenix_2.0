import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeviceTypeService } from '../services/device-type.service';
import { CreateDeviceTypeDto } from '../dto/create-device-type.dto';
import { UpdateDeviceTypeDto } from '../dto/update-device-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('device-type')
@Controller('device-type')
@ApiBearerAuth()
export class DeviceTypeController {
  constructor(private readonly deviceTypeService: DeviceTypeService) {}

  @Post('/createDeviceType/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createDeviceType(@Body() createDeviceTypeDto: CreateDeviceTypeDto) {
    return this.deviceTypeService.createDeviceType(createDeviceTypeDto);
  }

  @Get('/listDeviceTypes/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listDeviceTypes() {
    return this.deviceTypeService.findAllDeviceTypes();
  }

  @Get('/findDeviceType/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findDeviceType(@Param('id') id: number) {
    return this.deviceTypeService.findOneDeviceType(id);
  }

  @Patch('/updateDeviceType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateDeviceType(
    @Param('id') id: number,
    @Body() updateDeviceTypeDto: UpdateDeviceTypeDto,
  ) {
    return this.deviceTypeService.updateDeviceType(id, updateDeviceTypeDto);
  }

  @Delete('/deleteDeviceType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteDeviceType(@Param('id') id: number) {
    return this.deviceTypeService.deleteDeviceType(id);
  }
}
