import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRiskConsequenceDto } from '../dto/create-risk-consequence.dto';
import { UpdateRiskConsequenceDto } from '../dto/update-risk-consequence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RiskConsequence } from '../entities/risk-consequence.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RiskConsequencesService {
  constructor(
    @InjectRepository(RiskConsequence)
    private readonly riskConsequenceRepository: Repository<RiskConsequence>,
  ) {}

  async createRiskConsequence(
    createRiskConsequenceDto: CreateRiskConsequenceDto,
  ) {
    if (
      !createRiskConsequenceDto ||
      !createRiskConsequenceDto.ris_co_name ||
      !createRiskConsequenceDto.ris_co_event_id
    ) {
      throw new HttpException(
        'lgunos datos de la consecuencia son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findRiskConsequence = await this.riskConsequenceRepository.findOne({
      where: {
        ris_co_name: createRiskConsequenceDto.ris_co_name,
        ris_co_event_id: createRiskConsequenceDto.ris_co_event_id,
        ris_co_status: true,
      },
    });

    if (findRiskConsequence) {
      throw new HttpException(
        'La consecuencia ya existe para este riesgo.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const riskConsequence = this.riskConsequenceRepository.create(
      createRiskConsequenceDto,
    );
    await this.riskConsequenceRepository.save(riskConsequence);

    return new HttpException(
      `¡La consecuencia se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllRiskConsequence() {
    const riskConsequences = await this.riskConsequenceRepository.find({
      where: { ris_co_status: true },
    });

    if (riskConsequences.length === 0) {
      throw new HttpException(
        'No se encontró la lista de las consecuencias.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskConsequences;
  }

  async findOneRiskConsequence(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador de la consecuencia es requerida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const riskConsequence = await this.riskConsequenceRepository.findOne({
      where: { id, ris_co_status: true },
    });

    if (!riskConsequence) {
      throw new HttpException(
        'No se encontró la consecuencia.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskConsequence;
  }

  async findRiskConsequenceByEventId(eventId: number) {
    if (!eventId) {
      throw new HttpException(
        'El identificador del riesgo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const riskConsequences = await this.riskConsequenceRepository.find({
      where: { ris_co_event_id: eventId, ris_co_status: true },
      order: { createdAt: 'ASC' },
    });

    if (riskConsequences.length === 0) {
      throw new HttpException(
        'No se encontró la lista de consecuencias relacionados con el riesgo.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskConsequences;
  }

  async updateRiskConsequence(
    id: number,
    updateRiskConsequenceDto: UpdateRiskConsequenceDto,
  ) {
    if (!updateRiskConsequenceDto) {
      throw new HttpException(
        'Los datos para actualizar la consecuencia son requeridas.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneRiskConsequence(id);
    const result = await this.riskConsequenceRepository.update(
      id,
      updateRiskConsequenceDto,
    );
    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar la consecuencia.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteRiskConsequence(id: number) {
    const riskConsequenceFound = await this.riskConsequenceRepository.findOneBy(
      { id },
    );

    if (!riskConsequenceFound) {
      throw new HttpException(
        `consecuencia no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }
    const result = await this.riskConsequenceRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar la consecuencia.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
