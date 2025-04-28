import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventTypeService } from '../services/event-type.service';
import { CreateEventTypeDto } from '../dto/create-event-type.dto';
import { UpdateEventTypeDto } from '../dto/update-event-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('event-type')
@Controller('event-type')
@ApiBearerAuth()
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Post('/createEventType/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createEventType(@Body() createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypeService.createEventType(createEventTypeDto);
  }

  @Post('/createEventTypeArray') //es para cargar datos masivos
  createEventTypeArray(@Body() createEventTypeDto: CreateEventTypeDto[]) {
    return this.eventTypeService.createEventTypesArray(createEventTypeDto);
  }

  @Get('/listEventTypes/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listEventTypes() {
    return this.eventTypeService.findAllEventTypes();
  }

  @Get('/findEventType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findEventType(@Param('id') id: number) {
    return this.eventTypeService.findOneEventType(id);
  }

  @Get('/findEvenTypeByCaseType/:caseTypeId')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findEvenTypeByCaseType(@Param('caseTypeId') caseTypeId: number) {
    return this.eventTypeService.findEvenTypeByCaseType(caseTypeId);
  }

  @Patch('/updateEventType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateEventType(
    @Param('id') id: number,
    @Body() updateEventTypeDto: UpdateEventTypeDto,
  ) {
    return this.eventTypeService.updateEventType(id, updateEventTypeDto);
  }

  @Delete('/deleteEventType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteEventType(@Param('id') id: number) {
    return this.eventTypeService.deleteEventType(id);
  }
}
