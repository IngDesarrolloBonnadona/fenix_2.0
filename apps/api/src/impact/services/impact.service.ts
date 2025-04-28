import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateImpactDto } from '../dto/create-impact.dto';
import { UpdateImpactDto } from '../dto/update-impact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Impact } from '../entities/impact.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ImpactService {
  constructor(
    @InjectRepository(Impact)
    private readonly impactRepository: Repository<Impact>,
  ) {}

  async createImpact(createImpactDto: CreateImpactDto) {
    if (
      !createImpactDto ||
      !createImpactDto.imp_level ||
      !createImpactDto.imp_name
    ) {
      throw new HttpException(
        'Algunos datos del impacto son requeridos',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { imp_level, imp_name } = createImpactDto;

    const existingImpact = await this.impactRepository.findOne({
      where: [
        {
          imp_level: imp_level,
          imp_status: true,
        },
        {
          imp_name: imp_name,
          imp_status: true,
        },
      ],
    });

    if (existingImpact) {
      const duplicateField =
        existingImpact.imp_level === imp_level ? 'nivel' : 'nombre';

      throw new HttpException(
        `El ${duplicateField} ya existe, por favor seleccione otro.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const impact = this.impactRepository.create(createImpactDto);
    await this.impactRepository.save(impact);

    return new HttpException(
      `¡El impacto se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllImpact() {
    const impacts = await this.impactRepository.find({
      where: { imp_status: true },
      order: { imp_level: 'ASC' },
    });

    if (impacts.length === 0) {
      throw new HttpException(
        'No se encontró la lista de impactos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return impacts;
  }

  async findOneImpact(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del impacto es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const impact = await this.impactRepository.findOne({
      where: { id, imp_status: true },
    });

    if (!impact) {
      throw new HttpException(
        'No se encontró el impacto.',
        HttpStatus.NOT_FOUND,
      );
    }

    return impact;
  }

  async updateImpact(id: number, updateImpactDto: UpdateImpactDto) {
    if (!updateImpactDto) {
      throw new HttpException(
        'Los datos para actualizar el impacto son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneImpact(id);

    if (updateImpactDto.imp_name) {
      const duplicateName = await this.impactRepository.findOne({
        where: {
          id: Not(id),
          imp_name: updateImpactDto.imp_name,
          imp_status: true,
        },
      });

      if (duplicateName) {
        throw new HttpException(
          `El nombre del impacto ya existe.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const result = await this.impactRepository.update(id, updateImpactDto);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el impacto.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteImpact(id: number) {
    const impactFound = await this.impactRepository.findOneBy({ id });

    if (!impactFound) {
      throw new HttpException(
        `Impacto no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.impactRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el Impacto.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
