import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SafetyBarriersService } from '../services/safety-barriers.service';
import { CreateSafetyBarrierDto } from '../dto/create-safety-barrier.dto';
import { UpdateSafetyBarrierDto } from '../dto/update-safety-barrier.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('safety-barriers')
@Controller('safety-barriers')
@ApiBearerAuth()
export class SafetyBarriersController {
  constructor(private readonly safetyBarriersService: SafetyBarriersService) {}

  @Post('/createSafetyBarrier/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createSafetyBarrier(@Body() createSafetyBarrierDto: CreateSafetyBarrierDto) {
    return this.safetyBarriersService.createSafetyBarrier(
      createSafetyBarrierDto,
    );
  }

  @Get('/listSafetyBarriers')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listSafetyBarriers() {
    return this.safetyBarriersService.findAllSafetyBarriers();
  }

  @Get('/findSafetyBarrier/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findSafetyBarrier(@Param('id') id: number) {
    return this.safetyBarriersService.findOneSafetyBarrier(id);
  }

  @Patch('/updateSafetyBarrier/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateSafetyBarrier(
    @Param('id') id: number,
    @Body() updateSafetyBarrierDto: UpdateSafetyBarrierDto,
  ) {
    return this.safetyBarriersService.updateSafetyBarrier(
      id,
      updateSafetyBarrierDto,
    );
  }

  @Delete('/deleteSafetyBarrier/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteSafetyBarrier(@Param('id') id: number) {
    return this.safetyBarriersService.deleteSafetyBarrier(id);
  }
}
