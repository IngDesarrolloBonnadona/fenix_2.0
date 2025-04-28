import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OriginService } from '../services/origin.service';
import { CreateOriginDto } from '../dto/create-origin.dto';
import { UpdateOriginDto } from '../dto/update-origin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('origin')
@Controller('origin')
@ApiBearerAuth()
export class OriginController {
  constructor(private readonly originService: OriginService) {}

  @Post('/createOrigin/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createOrigin(@Body() createOriginDto: CreateOriginDto) {
    return this.originService.createOrigin(createOriginDto);
  }

  @Get('/listOrigins/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listOrigins() {
    return this.originService.findAllOrigins();
  }

  @Get('/findOrigin/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findOrigin(@Param('id') id: number) {
    return this.originService.findOneOrigin(id);
  }

  @Patch('/updateOrigin/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateOrigin(
    @Param('id') id: number,
    @Body() updateOriginDto: UpdateOriginDto,
  ) {
    return this.originService.updateOrigin(id, updateOriginDto);
  }

  @Delete('/deleteOrigin/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteOrigin(@Param('id') id: number) {
    return this.originService.deleteOrigin(id);
  }
}
