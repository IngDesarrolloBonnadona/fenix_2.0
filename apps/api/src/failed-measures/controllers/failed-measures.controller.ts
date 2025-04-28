import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FailedMeasuresService } from '../services/failed-measures.service';
import { CreateFailedMeasureDto } from '../dto/create-failed-measure.dto';
import { UpdateFailedMeasureDto } from '../dto/update-failed-measure.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('failed-measures')
@Controller('failed-measures')
@ApiBearerAuth()
export class FailedMeasuresController {
  constructor(private readonly failedMeasuresService: FailedMeasuresService) {}

  @Post('/createFailedMeasure/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createFailedMeasure(@Body() createFailedMeasureDto: CreateFailedMeasureDto) {
    return this.failedMeasuresService.createFailedMeasure(
      createFailedMeasureDto,
    );
  }

  @Get('/listFailedMeasures/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listFailedMeasures() {
    return this.failedMeasuresService.findAllFailedMeasures();
  }

  @Get('/findFailedMeasure/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findFailedMeasure(@Param('id') id: number) {
    return this.failedMeasuresService.findOneFailedMeasure(id);
  }

  @Patch('/updateFailedMeasure/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateFailedMeasure(
    @Param('id') id: number,
    @Body() updateFailedMeasureDto: UpdateFailedMeasureDto,
  ) {
    return this.failedMeasuresService.updateFailedMeasure(
      id,
      updateFailedMeasureDto,
    );
  }

  @Delete('/deleteFailedMeasure/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteFailedMeasure(@Param('id') id: number) {
    return this.failedMeasuresService.deleteFailedMeasure(id);
  }
}
