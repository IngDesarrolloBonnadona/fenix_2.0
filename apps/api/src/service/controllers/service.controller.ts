import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceService } from '../services/service.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('service')
@Controller('service')
@ApiBearerAuth()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/createService/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createService(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.createService(createServiceDto);
  }

  @Get('/listServices/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listServices() {
    return this.serviceService.findAllServices();
  }

  @Get('/findService/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findService(@Param('id') id: number) {
    return this.serviceService.findOneService(id);
  }

  @Patch('/updateService/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateService(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.updateService(id, updateServiceDto);
  }

  @Delete('/deleteService/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteService(@Param('id') id: number) {
    return this.serviceService.deleteService(id);
  }
}
