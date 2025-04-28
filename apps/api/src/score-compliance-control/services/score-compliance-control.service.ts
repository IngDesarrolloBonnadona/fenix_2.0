import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateScoreComplianceControlDto } from '../dto/create-score-compliance-control.dto';
import { UpdateScoreComplianceControlDto } from '../dto/update-score-compliance-control.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreComplianceControl } from '../entities/score-compliance-control.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ScoreComplianceControlService {
  constructor(
    @InjectRepository(ScoreComplianceControl)
    private readonly scoreComplianceRepository: Repository<ScoreComplianceControl>,
  ) {}

  async createScoreComplianceControl(
    createScoreComplianceControlDto: CreateScoreComplianceControlDto,
  ) {
    if (
      !createScoreComplianceControlDto ||
      !createScoreComplianceControlDto.sco_name ||
      !createScoreComplianceControlDto.sco_percentage
    ) {
      throw new HttpException(
        'Algunos datos del puntaje de cumplimiento son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findScoreComplianceControl =
      await this.scoreComplianceRepository.findOne({
        where: {
          sco_name: createScoreComplianceControlDto.sco_name,
          sco_status: true,
        },
      });

    if (findScoreComplianceControl) {
      throw new HttpException(
        'El nombre del cumplimiento ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const scoreComplianceControl = this.scoreComplianceRepository.create(
      createScoreComplianceControlDto,
    );
    await this.scoreComplianceRepository.save(scoreComplianceControl);

    return new HttpException(
      `¡El puntajed de cumplimiento se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllScoreComplianceControl() {
    const scoreComplianceControl = await this.scoreComplianceRepository.find({
      where: { sco_status: true },
    });

    if (scoreComplianceControl.length === 0) {
      throw new HttpException(
        'No se encontró la lista de puntajes de cumplimiento.',
        HttpStatus.NOT_FOUND,
      );
    }
    return scoreComplianceControl;
  }

  async findOneScoreComplianceControl(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del puntaje de cumplimiento es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const scoreComplianceControl = await this.scoreComplianceRepository.findOne(
      {
        where: { id, sco_status: true },
      },
    );

    if (!scoreComplianceControl) {
      throw new HttpException(
        'No se encontró el puntaje de cumplimiento.',
        HttpStatus.NOT_FOUND,
      );
    }
    return scoreComplianceControl;
  }

  async updateScoreComplianceControl(
    id: number,
    updateScoreComplianceControlDto: UpdateScoreComplianceControlDto,
  ) {
    if (!updateScoreComplianceControlDto) {
      throw new HttpException(
        'Los datos para actualizar el puntaje de cumplimiento son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneScoreComplianceControl(id);

    if (updateScoreComplianceControlDto.sco_name) {
      const duplicateName = await this.scoreComplianceRepository.findOne({
        where: {
          id: Not(id),
          sco_name: updateScoreComplianceControlDto.sco_name,
          sco_status: true,
        },
      });

      if (duplicateName) {
        throw new HttpException(
          `El nombre del puntaje de cumplimiento ya existe.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const result = await this.scoreComplianceRepository.update(
      id,
      updateScoreComplianceControlDto,
    );

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el puntaje de cumplimiento.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteScoreComplianceControl(id: number) {
    const scoreComplianceControlFound =
      await this.scoreComplianceRepository.findOneBy({ id });

    if (!scoreComplianceControlFound) {
      throw new HttpException(
        `puntaje de cumplimiento no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }
    const result = await this.scoreComplianceRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el puntaje de cumplimiento.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
