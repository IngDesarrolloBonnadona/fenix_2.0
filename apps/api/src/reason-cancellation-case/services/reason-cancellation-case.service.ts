import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReasonCancellationCaseDto } from '../dto/create-reason-cancellation-case.dto';
import { UpdateReasonCancellationCaseDto } from '../dto/update-reason-cancellation-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReasonCancellationCase } from '../entities/reason-cancellation-case.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ReasonCancellationCaseService {
  constructor(
    @InjectRepository(ReasonCancellationCase)
    private readonly reasonCancellationCaseRepository: Repository<ReasonCancellationCase>,
  ) {}

  async createReasonCancellationCase(
    createReasonCancellationCaseDto: CreateReasonCancellationCaseDto,
  ) {
    if (
      !createReasonCancellationCaseDto ||
      !createReasonCancellationCaseDto.cac_r_cause
    ) {
      throw new HttpException(
        'Algunos datos del motivo de anulación son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findReasonCancellationCase =
      await this.reasonCancellationCaseRepository.findOne({
        where: {
          cac_r_cause: createReasonCancellationCaseDto.cac_r_cause,
          cac_r_status: true,
        },
      });

    if (findReasonCancellationCase) {
      throw new HttpException(
        `El motivo de anulación ya existe.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const reasonCancellationCase = this.reasonCancellationCaseRepository.create(
      createReasonCancellationCaseDto,
    );
    await this.reasonCancellationCaseRepository.save(reasonCancellationCase);

    return new HttpException(
      `¡El motivo de anulación ${reasonCancellationCase.cac_r_cause} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllReasonCancellationCases() {
    const reasonCancellationCases =
      await this.reasonCancellationCaseRepository.find({
        where: { cac_r_status: true },
        order: {
          cac_r_cause: 'ASC',
        },
      });

    if (reasonCancellationCases.length === 0) {
      throw new HttpException(
        'No se encontró la lista de motivos de anulación.',
        HttpStatus.NOT_FOUND,
      );
    }
    return reasonCancellationCases;
  }

  async findOneReasonCancellationCase(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del motivo de anulación es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const reasonCancellationCase =
      await this.reasonCancellationCaseRepository.findOne({
        where: { id, cac_r_status: true },
      });

    if (!reasonCancellationCase) {
      throw new HttpException(
        'No se encontró el motivo de anulación.',
        HttpStatus.NOT_FOUND,
      );
    }
    return reasonCancellationCase;
  }

  async updateReasonCancellationCase(
    id: number,
    updateReasonCancellationCaseDto: UpdateReasonCancellationCaseDto,
  ) {
    if (!updateReasonCancellationCaseDto) {
      throw new HttpException(
        'Los datos para actualizar el motivo de anulación son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneReasonCancellationCase(id);

    if (updateReasonCancellationCaseDto.cac_r_cause) {
      const duplicateName = await this.reasonCancellationCaseRepository.findOne(
        {
          where: {
            id: Not(id),
            cac_r_cause: updateReasonCancellationCaseDto.cac_r_cause,
            cac_r_status: true,
          },
        },
      );

      if (duplicateName) {
        throw new HttpException(
          `El nombre del motivo de anulación ya existe.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const result = await this.reasonCancellationCaseRepository.update(
      id,
      updateReasonCancellationCaseDto,
    );

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el motivo de anulación.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteReasonCancellationCase(id: number) {
    const reasonFound = await this.reasonCancellationCaseRepository.findOneBy({
      id,
    });

    if (!reasonFound) {
      throw new HttpException(
        `Razón anulación de caso no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.reasonCancellationCaseRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el motivo de devolución.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
