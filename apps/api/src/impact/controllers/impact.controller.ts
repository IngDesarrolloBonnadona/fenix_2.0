import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImpactService } from '../services/impact.service';
import { CreateImpactDto } from '../dto/create-impact.dto';
import { UpdateImpactDto } from '../dto/update-impact.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('impact')
@Controller('impact')
@ApiBearerAuth()
export class ImpactController {
  constructor(private readonly impactService: ImpactService) {}

  @Post('/createImpact/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createImpact(@Body() createImpactDto: CreateImpactDto) {
    return this.impactService.createImpact(createImpactDto);
  }

  @Get('/listImpacts/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listImpact() {
    return this.impactService.findAllImpact();
  }

  @Get('/findImpact/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findImpact(@Param('id') id: number) {
    return this.impactService.findOneImpact(id);
  }

  @Patch('/updateImpact/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateImpact(
    @Param('id') id: number,
    @Body() updateImpactDto: UpdateImpactDto,
  ) {
    return this.impactService.updateImpact(id, updateImpactDto);
  }

  @Delete('/deleteImpact/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteImpact(@Param('id') id: number) {
    return this.impactService.deleteImpact(id);
  }
}
