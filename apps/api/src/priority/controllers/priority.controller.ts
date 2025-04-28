import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PriorityService } from '../services/priority.service';
import { CreatePriorityDto } from '../dto/create-priority.dto';
import { UpdatePriorityDto } from '../dto/update-priority.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('priority')
@Controller('priority')
@ApiBearerAuth()
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Post('/createPriority/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createPriority(@Body() createPriorityDto: CreatePriorityDto) {
    return this.priorityService.createPriority(createPriorityDto);
  }

  @Get('/listPriorities/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listPriorities() {
    return this.priorityService.findAllPriorities();
  }

  @Get('/findPriority/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findPriority(@Param('id') id: number) {
    return this.priorityService.findOnePriority(id);
  }

  @Patch('/updatePriority/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateStatusPriority(
    @Param('id') id: number,
    @Body() updateStatusPriority: UpdatePriorityDto,
  ) {
    return this.priorityService.updateStatusPriority(id, updateStatusPriority);
  }

  @Delete('/deletePriority/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deletePriority(@Param('id') id: number) {
    return this.priorityService.deletePriority(id);
  }
}
