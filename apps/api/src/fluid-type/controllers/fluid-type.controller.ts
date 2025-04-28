import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FluidTypeService } from '../services/fluid-type.service';
import { CreateFluidTypeDto } from '../dto/create-fluid-type.dto';
import { UpdateFluidTypeDto } from '../dto/update-fluid-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('fluid-type')
@Controller('fluid-type')
@ApiBearerAuth()
export class FluidTypeController {
  constructor(private readonly fluidTypeService: FluidTypeService) {}

  @Post('/createFluidType/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createFluidType(@Body() createFluidTypeDto: CreateFluidTypeDto) {
    return this.fluidTypeService.createFluidType(createFluidTypeDto);
  }

  @Get('/listFluidTypes/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listFluidType() {
    return this.fluidTypeService.findAllFluidTypes();
  }

  @Get('/findFluidType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findFluidType(@Param('id') id: number) {
    return this.fluidTypeService.findOneFluidType(id);
  }

  @Patch('/updateFluidType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateFluidTypes(
    @Param('id') id: number,
    @Body() updateFluidTypeDto: UpdateFluidTypeDto,
  ) {
    return this.fluidTypeService.updateFluidType(id, updateFluidTypeDto);
  }

  @Delete('/deleteFluidType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteFluidTypes(@Param('id') id: number) {
    return this.fluidTypeService.deleteFluidType(id);
  }
}
