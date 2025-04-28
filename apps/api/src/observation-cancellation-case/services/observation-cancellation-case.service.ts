import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateObservationCancellationCaseDto } from '../dto/create-observation-cancellation-case.dto';
import { UpdateObservationCancellationCaseDto } from '../dto/update-observation-cancellation-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ObservationCancellationCase } from '../entities/observation-cancellation-case.entity';
import { Repository } from 'typeorm';
import { CaseReportValidateService } from 'src/case-report-validate/services/case-report-validate.service';

@Injectable()
export class ObservationCancellationCaseService {
  constructor(
    @InjectRepository(ObservationCancellationCase)
    private readonly observationCancellationCase: Repository<ObservationCancellationCase>,
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  async createObservationCancellationCase(
    createObservationCancellationCaseDto: CreateObservationCancellationCaseDto,
    idUser: string,
    idCaseValidate: string,
  ) {
    if (
      !createObservationCancellationCaseDto ||
      !createObservationCancellationCaseDto.cac_o_observation
    ) {
      throw new HttpException(
        'La observación de anulación del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idUser) {
      throw new HttpException(
        'El identificador del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idCaseValidate) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const observationSaved = this.observationCancellationCase.create({
      ...createObservationCancellationCaseDto,
      cac_o_user_id: idUser,
      cac_o_validatedcase_id_fk: idCaseValidate,
    });
    await this.observationCancellationCase.save(observationSaved);

    return new HttpException(
      `¡El motivo de anulación del caso se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async listObservationCancellationCases() {
    const observationCancellations =
      await this.observationCancellationCase.find({
        where: {
          cac_o_status: true,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    if (observationCancellations.length === 0) {
      throw new HttpException(
        `No se encontró la lista de observaciones de anulación de los casos`,
        HttpStatus.NOT_FOUND,
      );
    }
    return observationCancellations;
  }

  async findOneObservationCancellationCase(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador de la observación de anulación del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const observationCancelation =
      await this.observationCancellationCase.findOne({
        where: {
          id,
          cac_o_status: true,
        },
      });

    if (!observationCancelation) {
      throw new HttpException(
        'No se encontró la observación de anulación del caso.',
        HttpStatus.NOT_FOUND,
      );
    }
    return observationCancelation;
  }

  async findOneObservationCancellationByCaseValidateId(CaseValidateId: string) {
    if (!CaseValidateId) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const observationCancellation =
      await this.observationCancellationCase.findOne({
        where: {
          cac_o_validatedcase_id_fk: CaseValidateId,
        },
        relations: {
          reasonCancellationCase: true,
        },
      });

    if (!observationCancellation) {
      throw new HttpException(
        'No se encontró la observación de anulación del caso.',
        HttpStatus.NOT_FOUND,
      );
    }
    return observationCancellation;
  }

  async deleteObservationCancellationCase(id: number) {
    const observationCancellationFound =
      await this.observationCancellationCase.findOneBy({ id });

    if (!observationCancellationFound) {
      throw new HttpException(`Datos no encontrados.`, HttpStatus.NOT_FOUND);
    }

    const result = await this.observationCancellationCase.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar la observación de anulación del caso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
