import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Not, Repository } from 'typeorm';

import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';

import { Event } from '../entities/event.entity';
import { EventType } from 'src/event-type/entities/event-type.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { CaseTypeReportEnum } from 'src/utils/enums/caseType-report.enum';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventType)
    private readonly eventTypeRepository: Repository<EventType>,
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    if (
      !createEventDto ||
      !createEventDto.eve_name ||
      !createEventDto.eve_eventtype_id_fk
    ) {
      throw new HttpException(
        'Algunos datos del suceso son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findEvents = await this.eventRepository.findOne({
      where: {
        eve_name: createEventDto.eve_name,
        eve_eventtype_id_fk: createEventDto.eve_eventtype_id_fk,
        eve_status: true,
      },
    });

    if (findEvents) {
      throw new HttpException(
        `El suceso ya existe en el tipo de suceso seleccionado.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const eventTypeFound = await this.eventTypeRepository.findOneBy({
      id: createEventDto.eve_eventtype_id_fk,
    });

    if (!eventTypeFound) {
      throw new HttpException(
        `Estrategia no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (createEventDto.eve_unit_id_fk) {
      const unitFound = await this.unitRepository.findOneBy({
        id: createEventDto.eve_unit_id_fk,
      });

      if (!unitFound) {
        throw new HttpException(`Unidad no encontrada.`, HttpStatus.NOT_FOUND);
      }
    }

    const event = this.eventRepository.create(createEventDto);
    await this.eventRepository.save(event);

    return new HttpException(
      `¡El suceso ${event.eve_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  // Se usa para parametrizar datos masivos
  async createEventsArray(createEventDto: CreateEventDto[]) {
    const eventToCreate = [];

    for (const event of createEventDto) {
      const findEvent = await this.eventRepository.findOne({
        where: {
          eve_name: event.eve_name,
          eve_eventtype_id_fk: event.eve_eventtype_id_fk,
          eve_unit_id_fk: event.eve_unit_id_fk,
          eve_status: true,
        },
      });

      if (findEvent) {
        throw new HttpException(
          `El suceso ${event.eve_name} ya existe en el tipo de suceso seleccionado.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const newEvent = this.eventRepository.create(event);
      eventToCreate.push(newEvent);
    }

    await this.eventRepository.save(eventToCreate);

    return new HttpException(
      `¡Los sucesos se crearon correctamente ${eventToCreate.length}!`,
      HttpStatus.CREATED,
    );
  }

  async findAllEvents() {
    const events = await this.eventRepository.find({
      where: {
        eve_status: true,
      },
      relations: {
        eventType: {
          caseType: true,
        },
        unit: true,
        riskType: true,
        oncologyCategory: true,
        characterizationCase: true,
        materializedAdverseEvent: true,
        materializedIncident: true,
      },
      order: {
        eve_name: 'ASC',
      },
    });

    if (events.length === 0) {
      throw new HttpException(
        'No se encontró la lista de sucesos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return events;
  }

  async findRisksEvents() {
    const riskEvents = await this.eventRepository.find({
      where: {
        eve_status: true,
        eventType: {
          caseType: {
            cas_t_name: CaseTypeReportEnum.RISK,
          },
        },
      },
      relations: {
        eventType: {
          caseType: true,
        },
        caseReportValidate: true,
        unit: true,
        oncologyCategory: true,
        materializedAdverseEvent: {
          caseReportValidate: true,
        },
        materializedIncident: { caseReportValidate: true },
      },
      order: {
        eve_name: 'ASC',
      },
    });

    if (riskEvents.length === 0) {
      throw new HttpException(
        'No se encontró la lista de sucesos de riesgos.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskEvents;
  }

  async findMaterializedAdverseEvents() {
    const riskEvents = await this.eventRepository.find({
      where: {
        eve_status: true,
        eventType: {
          caseType: {
            cas_t_name: CaseTypeReportEnum.ADVERSE_EVENT,
          },
        },
      },
      relations: {
        eventType: {
          caseType: true,
        },
        caseReportValidate: true,
        unit: true,
        oncologyCategory: true,
        materializedAdverseEvent: {
          caseReportValidate: true,
        },
        materializedIncident: { caseReportValidate: true },
      },
      order: {
        eve_name: 'ASC',
      },
    });

    if (riskEvents.length === 0) {
      throw new HttpException(
        'No se encontró la lista de sucesos de riesgos.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskEvents;
  }
  async findMaterializedIncidents() {
    const riskEvents = await this.eventRepository.find({
      where: {
        eve_status: true,
        eventType: {
          caseType: {
            cas_t_name: CaseTypeReportEnum.INCIDENT,
          },
        },
      },
      relations: {
        eventType: {
          caseType: true,
        },
        caseReportValidate: true,
        unit: true,
        oncologyCategory: true,
        materializedAdverseEvent: {
          caseReportValidate: true,
        },
        materializedIncident: { caseReportValidate: true },
      },
      order: {
        eve_name: 'ASC',
      },
    });

    if (riskEvents.length === 0) {
      throw new HttpException(
        'No se encontró la lista de sucesos de riesgos.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskEvents;
  }

  async findOneEvent(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del suceso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const event = await this.eventRepository.findOne({
      where: { id, eve_status: true },
    });

    if (!event) {
      throw new HttpException(
        'No se encontró el suceso.',
        HttpStatus.NOT_FOUND,
      );
    }

    return event;
  }

  async findEventByEventTypeAndIdUnitId(eventTypeId: number, unitId?: number) {
    const where: any = { eve_eventtype_id_fk: eventTypeId };

    if (unitId !== undefined || unitId !== null) {
      where.eve_unit_id_fk = unitId;
    }

    where.eve_status = true;

    const events = await this.eventRepository.find({
      where,
      order: {
        eve_name: 'ASC',
      },
    });

    if (events.length === 0) {
      throw new HttpException(
        'No se encontró la lista de sucesos relacionados con el tipo de suceso.',
        HttpStatus.NOT_FOUND,
      );
    }

    return events;
  }

  async findEventByEventTypeId(eventTypeId: number) {
    if (!eventTypeId) {
      throw new HttpException(
        'El identificador de la estrategia es requerida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const events = await this.eventRepository.find({
      where: {
        eve_eventtype_id_fk: eventTypeId,
        eve_status: true,
      },
      order: {
        eve_name: 'ASC',
      },
    });

    if (events.length === 0) {
      throw new HttpException(
        'No se encontró la lista de sucesos relacionados con la estrategia.',
        HttpStatus.NOT_FOUND,
      );
    }

    return events;
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto) {
    if (!updateEventDto) {
      throw new HttpException(
        'Los datos para actualizar el suceso son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const eventTypeFound = await this.eventTypeRepository.findOneBy({
      id: updateEventDto.eve_eventtype_id_fk,
    });

    if (!eventTypeFound) {
      throw new HttpException(
        `Estrategia no encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (updateEventDto.eve_unit_id_fk) {
      const unitFound = await this.unitRepository.findOneBy({
        id: updateEventDto.eve_unit_id_fk,
      });

      if (!unitFound) {
        throw new HttpException(`Unidad no encontrada.`, HttpStatus.NOT_FOUND);
      }
    }

    const eventFound = await this.eventRepository.findOneBy({ id });

    if (!eventFound) {
      throw new HttpException(`Suceso no encontrado.`, HttpStatus.NOT_FOUND);
    }

    if (updateEventDto.eve_name) {
      const duplicateName = await this.eventRepository.findOne({
        where: {
          id: Not(id),
          eve_name: updateEventDto.eve_name,
          eve_eventtype_id_fk: updateEventDto.eve_eventtype_id_fk,
          eve_status: true,
        },
      });

      if (duplicateName) {
        throw new HttpException(
          `El nombre del suceso ya existe con esta estrategia.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const result = await this.eventRepository.update(id, updateEventDto);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el suceso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteEvent(id: number) {
    const eventFound = await this.eventRepository.findOneBy({ id });

    if (!eventFound) {
      throw new HttpException(
        `Suceso no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.eventRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el suceso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
