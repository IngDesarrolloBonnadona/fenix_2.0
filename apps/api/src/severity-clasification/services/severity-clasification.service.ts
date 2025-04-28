import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Not, Repository } from 'typeorm';

import { CreateSeverityClasificationDto } from '../dto/create-severity-clasification.dto';
import { UpdateSeverityClasificationDto } from '../dto/update-severity-clasification.dto';

import { SeverityClasification } from '../entities/severity-clasification.entity';
import { SeverityClasificationEnum } from 'src/utils/enums/severity-clasif.enum';

@Injectable()
export class SeverityClasificationService {
  constructor(
    @InjectRepository(SeverityClasification)
    private readonly severityClasifRepository: Repository<SeverityClasification>,
  ) {}

  async createSeverityClasification(
    createSeverityClasificationDto: CreateSeverityClasificationDto,
  ) {
    if (
      !createSeverityClasificationDto ||
      !createSeverityClasificationDto.sev_c_name
    ) {
      throw new HttpException(
        'El nombre de clasificación de seguridad es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const FindSevClasification = await this.severityClasifRepository.findOne({
      where: {
        sev_c_name: createSeverityClasificationDto.sev_c_name,
        sev_c_status: true,
      },
    });

    if (FindSevClasification) {
      throw new HttpException(
        'La clasificación de severidad ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const severityClasif = this.severityClasifRepository.create(
      createSeverityClasificationDto,
    );
    await this.severityClasifRepository.save(severityClasif);

    return new HttpException(
      `¡La clasificiación de severidad ${severityClasif.sev_c_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllSeverityClasifications() {
    const severityClasifs = await this.severityClasifRepository.find({
      where: {
        sev_c_status: true,
      },
    });

    if (severityClasifs.length === 0) {
      throw new HttpException(
        'No se encontró la lista de clasificaciones de severidad',
        HttpStatus.NOT_FOUND,
      );
    }

    const orderMap: Record<SeverityClasificationEnum, number> = {
      [SeverityClasificationEnum.MILD_SEVERITY]: 1,
      [SeverityClasificationEnum.MODERATE_SEVERITY]: 2,
      [SeverityClasificationEnum.SERIOUS_SEVERITY]: 3,
    };

    return severityClasifs.sort(
      (a, b) =>
        orderMap[a.sev_c_name as SeverityClasificationEnum] -
        orderMap[b.sev_c_name as SeverityClasificationEnum],
    );
  }

  async findOneSeverityClasification(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador de clasificación de severidad es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const severityClasif = await this.severityClasifRepository.findOne({
      where: { id, sev_c_status: true },
    });

    if (!severityClasif) {
      throw new HttpException(
        'No se encontró la clasificación de severidad',
        HttpStatus.NOT_FOUND,
      );
    }

    return severityClasif;
  }

  async updateSeverityClasification(
    id: number,
    updateSeverityClasificationDto: UpdateSeverityClasificationDto,
  ) {
    if (!updateSeverityClasificationDto) {
      throw new HttpException(
        'Los datos para actualizar la clasificación de severidad son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneSeverityClasification(id);

    if (updateSeverityClasificationDto.sev_c_name) {
      const duplicateName = await this.severityClasifRepository.findOne({
        where: {
          id: Not(id),
          sev_c_name: updateSeverityClasificationDto.sev_c_name,
        },
      });

      if (duplicateName) {
        throw new HttpException(
          'El nombre ya existe.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    const result = await this.severityClasifRepository.update(
      id,
      updateSeverityClasificationDto,
    );

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar la clasificacion de severidad`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteSeverityClasification(id: number) {
    const severityClasifFound = await this.severityClasifRepository.findOneBy({
      id,
    });

    if (!severityClasifFound) {
      throw new HttpException(
        `Clasificación de severidad no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.severityClasifRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar la clasificacion de severidad.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
