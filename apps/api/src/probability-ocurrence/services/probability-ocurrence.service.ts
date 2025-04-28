import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Not, Repository } from 'typeorm';

import { CreateProbabilityOcurrenceDto } from '../dto/create-probability-ocurrence.dto';
import { UpdateProbabilityOcurrenceDto } from '../dto/update-probability-ocurrence.dto';
import { ProbabilityOcurrence } from '../entities/probability-ocurrence.entity';

@Injectable()
export class ProbabilityOcurrenceService {
  constructor(
    @InjectRepository(ProbabilityOcurrence)
    private readonly probabilityOcurrenceRepository: Repository<ProbabilityOcurrence>,
  ) {}

  async createProbabilityOcurrence(
    createProbabilityOcurrenceDto: CreateProbabilityOcurrenceDto,
  ) {
    if (
      !createProbabilityOcurrenceDto ||
      !createProbabilityOcurrenceDto.prob_o_level ||
      !createProbabilityOcurrenceDto.prob_o_name
    ) {
      throw new HttpException(
        'Algunos datos son requeridos',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { prob_o_level, prob_o_name } = createProbabilityOcurrenceDto;

    const existingprobabilityOcurrence =
      await this.probabilityOcurrenceRepository.findOne({
        where: [
          {
            prob_o_level: prob_o_level,
            prob_o_status: true,
          },
          {
            prob_o_name: prob_o_name,
            prob_o_status: true,
          },
        ],
      });

    if (existingprobabilityOcurrence) {
      const duplicateField =
        existingprobabilityOcurrence.prob_o_level === prob_o_level
          ? 'nivel'
          : 'nombre';

      throw new HttpException(
        `El ${duplicateField} ya existe, por favor seleccione otro.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const probabilityOcurrence = this.probabilityOcurrenceRepository.create(
      createProbabilityOcurrenceDto,
    );
    await this.probabilityOcurrenceRepository.save(probabilityOcurrence);

    return new HttpException(
      `¡La probabilidad de ocurrencia se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllProbabilityOcurrences() {
    const probabilityOcurrences =
      await this.probabilityOcurrenceRepository.find({
        where: { prob_o_status: true },
        order: { prob_o_level: 'ASC' },
      });

    if (probabilityOcurrences.length === 0) {
      throw new HttpException(
        'No se encontró la lista de probabilidades de ocurrencia.',
        HttpStatus.NOT_FOUND,
      );
    }

    return probabilityOcurrences;
  }

  async findOneProbabilityOcurrence(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador de la probabilidad de ocurrencia es requerida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const probabilityOcurrence =
      await this.probabilityOcurrenceRepository.findOne({
        where: { id, prob_o_status: true },
      });

    if (!probabilityOcurrence) {
      throw new HttpException(
        'No se encontró la probabilidad de ocurrencia.',
        HttpStatus.NOT_FOUND,
      );
    }

    return probabilityOcurrence;
  }

  async updateProbabilityOcurrence(
    id: number,
    updateProbabilityOcurrenceDto: UpdateProbabilityOcurrenceDto,
  ) {
    if (!updateProbabilityOcurrenceDto) {
      throw new HttpException(
        'Los datos para actualizar la probabilidad de ocurrencia son requeridas.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneProbabilityOcurrence(id);

    if (updateProbabilityOcurrenceDto.prob_o_name) {
      const duplicateName = await this.probabilityOcurrenceRepository.findOne({
        where: {
          id: Not(id),
          prob_o_name: updateProbabilityOcurrenceDto.prob_o_name,
          prob_o_status: true,
        },
      });

      if (duplicateName) {
        throw new HttpException(
          `El nombre de la probabilidad de ocurrencia ya existe.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const result = await this.probabilityOcurrenceRepository.update(
      id,
      updateProbabilityOcurrenceDto,
    );

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar la probabilidad de ocurrencia.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteProbabilityOcurrence(id: number) {
    const probabilityOcurrenceFound =
      await this.probabilityOcurrenceRepository.findOneBy({ id });

    if (!probabilityOcurrenceFound) {
      throw new HttpException(
        `La probabilidad de ocurrencia no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.probabilityOcurrenceRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar la probabilidad de ocurrencia.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
