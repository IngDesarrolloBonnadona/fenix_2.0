import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('event')
@Controller('event')
@ApiBearerAuth()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/createEvent/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Post('/createEventsArray') //es para cargar datos masivos
  createEventsArray(@Body() createEventDto: CreateEventDto[]) {
    return this.eventService.createEventsArray(createEventDto);
  }

  @Get('/listEvents/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listEvents() {
    return this.eventService.findAllEvents();
  }

  @Get('/listRisksEvents/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listRisksEvents() {
    return this.eventService.findRisksEvents();
  }

  @Get('/listMaterializedAdverseEvents/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listMaterializedAdverseEvents() {
    return this.eventService.findMaterializedAdverseEvents();
  }
  @Get('/listMaterializedIncidents/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listMaterializedIncidents() {
    return this.eventService.findMaterializedIncidents();
  }

  @Get('/findEvent/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findEvent(@Param('id') id: number) {
    return this.eventService.findOneEvent(id);
  }

  @Get('/findEventsByEventTypeIdAndUnitId/:eventTypeId/:unitId?/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findEventsByEventTypeIdAndUnitId(
    @Param('eventTypeId') eventTypeId: number,
    @Param('unitId') unitId?: string,
  ) {
    const unitIdNumber = unitId ? parseInt(unitId, 10) : undefined;
    return this.eventService.findEventByEventTypeAndIdUnitId(
      eventTypeId,
      unitIdNumber,
    );
  }

  @Get('/findEventsByEventTypeId/:eventTypeId/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findEventsByEventTypeId(@Param('eventTypeId') eventTypeId: number) {
    return this.eventService.findEventByEventTypeId(eventTypeId);
  }

  @Patch('/updateEvent/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateEvent(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete('/deleteEvent/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteEvent(@Param('id') id: number) {
    return this.eventService.deleteEvent(id);
  }
}
