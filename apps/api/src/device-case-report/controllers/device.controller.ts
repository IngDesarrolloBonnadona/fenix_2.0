import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('device')
@Controller('device')
@ApiBearerAuth()
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('/listDevice')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listDevice() {
    return this.deviceService.findAllDevices();
  }

  @Get('/findDevice/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findDevice(@Param('id') id: number) {
    return this.deviceService.findOneDevice(id);
  }

  @Get('/findExternalDevice')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async findExternalMedicine(@Query('device') device: string) {
    return this.deviceService.findExternalDevicesQuery(device);
  }

  @Delete('/deleteDevice/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteDevice(@Param('id') id: number) {
    return this.deviceService.deleteDevice(id);
  }
}
