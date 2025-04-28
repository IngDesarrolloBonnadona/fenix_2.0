import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRiskMitigationMeasureDto } from '../dto/create-risk-mitigation-measure.dto';
import { UpdateRiskMitigationMeasureDto } from '../dto/update-risk-mitigation-measure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RiskMitigationMeasure } from '../entities/risk-mitigation-measure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RiskMitigationMeasureService {
  constructor(
    @InjectRepository(RiskMitigationMeasure)
    private readonly riskMitigationMeasureRepository: Repository<RiskMitigationMeasure>,
  ) {}
  async createRiskMitigationMeasure(
    createRiskMitigationMeasureDto: CreateRiskMitigationMeasureDto,
  ) {
    if (
      !createRiskMitigationMeasureDto ||
      !createRiskMitigationMeasureDto.ris_m_name ||
      !createRiskMitigationMeasureDto.ris_m_event_id
    ) {
      throw new HttpException(
        'Algunos datos de la medida de mitigación son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findRiskMitigationMeasure =
      await this.riskMitigationMeasureRepository.findOne({
        where: {
          ris_m_name: createRiskMitigationMeasureDto.ris_m_name,
          ris_m_event_id: createRiskMitigationMeasureDto.ris_m_event_id,
          ris_m_status: true,
        },
      });

    if (findRiskMitigationMeasure) {
      throw new HttpException(
        'La medida de mitigación ya existe para este riesgo.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const riskMitigationMeasure = this.riskMitigationMeasureRepository.create(
      createRiskMitigationMeasureDto,
    );
    await this.riskMitigationMeasureRepository.save(riskMitigationMeasure);

    return new HttpException(
      `¡La medida de mitigación se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllRiskMitigationMeasure() {
    const riskMitigationMeasure =
      await this.riskMitigationMeasureRepository.find({
        where: { ris_m_status: true },
      });

    if (riskMitigationMeasure.length === 0) {
      throw new HttpException(
        'No se encontró la lista de las medidas de mitigación.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskMitigationMeasure;
  }

  async findOneRiskMitigationMeasure(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador de la medidas de mitigación es requerida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const riskMitigationMeasure =
      await this.riskMitigationMeasureRepository.findOne({
        where: { id, ris_m_status: true },
      });

    if (!riskMitigationMeasure) {
      throw new HttpException(
        'No se encontró la medidas de mitigación.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskMitigationMeasure;
  }

  async findRiskMitigationMeasureByEventId(eventId: number) {
    if (!eventId) {
      throw new HttpException(
        'El identificador del riesgo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const riskCauses = await this.riskMitigationMeasureRepository.find({
      where: { ris_m_event_id: eventId, ris_m_status: true },
      order: { createdAt: 'ASC' },
    });

    if (riskCauses.length === 0) {
      throw new HttpException(
        'No se encontró la lista de medidas de mitigación relacionadas con el riesgo.',
        HttpStatus.NOT_FOUND,
      );
    }
    return riskCauses;
  }

  async updateRiskMitigationMeasure(
    id: number,
    updateRiskMitigationMeasureDto: UpdateRiskMitigationMeasureDto,
  ) {
    if (!updateRiskMitigationMeasureDto) {
      throw new HttpException(
        'Los datos para actualizar la medidas de mitigación son requeridas.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneRiskMitigationMeasure(id);
    const result = await this.riskMitigationMeasureRepository.update(
      id,
      updateRiskMitigationMeasureDto,
    );

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar la medida de mitigación.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteRiskMitigationMeasure(id: number) {
    const riskMitigationMeasureFound =
      await this.riskMitigationMeasureRepository.findOneBy({ id });

    if (!riskMitigationMeasureFound) {
      throw new HttpException(
        `medida de mitigación no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }
    const result = await this.riskMitigationMeasureRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar la medida de mitigación.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
