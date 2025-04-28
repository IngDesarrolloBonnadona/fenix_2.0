import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubOriginService } from '../services/sub-origin.service';
import { CreateSubOriginDto } from '../dto/create-sub-origin.dto';
import { UpdateSubOriginDto } from '../dto/update-sub-origin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('sub-origin')
@Controller('sub-origin')
@ApiBearerAuth()
export class SubOriginController {
  constructor(private readonly subOriginService: SubOriginService) {}

  @Post('/createSubOrigin/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createSubOrigin(@Body() createSubOriginDto: CreateSubOriginDto) {
    return this.subOriginService.createSubOrigin(createSubOriginDto);
  }

  @Get('/listSubOrigins/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listSubOrigins() {
    return this.subOriginService.findAllSubOrigins();
  }

  @Get('/findSubOrigin/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findSubOrigin(@Param('id') id: number) {
    return this.subOriginService.findOneSubOrigin(id);
  }

  @Get('/findSubOriginByOriginId/:originId')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findSubOriginByOriginId(@Param('originId') originId: number) {
    return this.subOriginService.findSubOriginByOriginId(originId);
  }

  @Patch('/updateSubOrigin/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateSubOrigin(
    @Param('id') id: number,
    @Body() updateSubOriginDto: UpdateSubOriginDto,
  ) {
    return this.subOriginService.updateSubOrigin(id, updateSubOriginDto);
  }

  @Delete('/deleteSubOrigin/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteSubOrigin(@Param('id') id: number) {
    return this.subOriginService.deleteSubOrigin(id);
  }
}
