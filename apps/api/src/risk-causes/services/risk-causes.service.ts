import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRiskCauseDto } from '../dto/create-risk-cause.dto';
import { UpdateRiskCauseDto } from '../dto/update-risk-cause.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RiskCause } from '../entities/risk-cause.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RiskCausesService {
  constructor(
    @InjectRepository(RiskCause)
    private readonly riskCauseRepository: Repository<RiskCause>,
  ) {}

  async createRiskCause(createRiskCauseDto: CreateRiskCauseDto) {
    if (
      !createRiskCauseDto ||
      !createRiskCauseDto.ris_c_name ||
      !createRiskCauseDto.ris_c_event_id
    ) {
      throw new HttpException(
        'Algunos datos de la causa son requeridos',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findRiskCause = await this.riskCauseRepository.findOne({
      where: {
        ris_c_name: createRiskCauseDto.ris_c_name,
        ris_c_event_id: createRiskCauseDto.ris_c_event_id,
        ris_c_status: true,
      },
    });

    if (findRiskCause) {
      throw new HttpException(
        'La causa ya existe para este riesgo.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const riskCause = this.riskCauseRepository.create(createRiskCauseDto);
    await this.riskCauseRepository.save(riskCause);

    return new HttpException(
      `¡La causa se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllRiskCause() {
    const riskCauses = await this.riskCauseRepository.find({
      where: { ris_c_status: true },
    });

    if (riskCauses.length === 0) {
      throw new HttpException(
        'No se encontró la lista de las causas.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskCauses;
  }

  async findOneRiskCause(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador de la causa es requerida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const riskCause = await this.riskCauseRepository.findOne({
      where: { id, ris_c_status: true },
    });

    if (!riskCause) {
      throw new HttpException('No se encontró la causa.', HttpStatus.NOT_FOUND);
    }
    return riskCause;
  }

  async findRiskCauseByEventId(eventId: number) {
    if (!eventId) {
      throw new HttpException(
        'El identificador del riesgo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const riskCauses = await this.riskCauseRepository.find({
      where: { ris_c_event_id: eventId, ris_c_status: true },
      order: { createdAt: 'ASC' },
    });

    if (riskCauses.length === 0) {
      throw new HttpException(
        'No se encontró la lista de causas relacionados con el riesgo.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskCauses;
  }

  async updateRiskCause(id: number, updateRiskCauseDto: UpdateRiskCauseDto) {
    if (!updateRiskCauseDto) {
      throw new HttpException(
        'Los datos para actualizar la causa son requeridas.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneRiskCause(id);
    const result = await this.riskCauseRepository.update(
      id,
      updateRiskCauseDto,
    );
    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar la causa.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteRiskCause(id: number) {
    const riskCauseFound = await this.riskCauseRepository.findOneBy({ id });

    if (!riskCauseFound) {
      throw new HttpException(
        `causa no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }
    const result = await this.riskCauseRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar la causa.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
