import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Not, Repository } from 'typeorm';

import { CreateUnsafeActionDto } from '../dto/create-unsafe-action.dto';
import { UpdateUnsafeActionDto } from '../dto/update-unsafe-action.dto';

import { UnsafeAction } from '../entities/unsafe-action.entity';

@Injectable()
export class UnsafeActionService {
  constructor(
    @InjectRepository(UnsafeAction)
    private readonly unsafeActionRepository: Repository<UnsafeAction>,
  ) {}

  async createUnsafeAction(createUnsafeActionDto: CreateUnsafeActionDto) {
    if (!createUnsafeActionDto || !createUnsafeActionDto.uns_a_name) {
      throw new HttpException(
        'El nombre de la acción insegura es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findUnsafeAction = await this.unsafeActionRepository.findOne({
      where: {
        uns_a_name: createUnsafeActionDto.uns_a_name,
        uns_a_status: true,
      },
    });

    if (findUnsafeAction) {
      throw new HttpException(
        'la acción insegura ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const unsafeAction = this.unsafeActionRepository.create(
      createUnsafeActionDto,
    );
    await this.unsafeActionRepository.save(unsafeAction);

    return new HttpException(
      `¡La acción insegura ${unsafeAction.uns_a_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllUnsafeActions() {
    const unsafeAction = await this.unsafeActionRepository.find({
      where: { uns_a_status: true },
      order: { uns_a_name: 'ASC' },
    });

    if (unsafeAction.length === 0) {
      throw new HttpException(
        'No se encontró la lista de acciones inseguras.',
        HttpStatus.NOT_FOUND,
      );
    }

    return unsafeAction;
  }

  async findOneUnsafeActions(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador de la acción insegura es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const unsafeAction = await this.unsafeActionRepository.findOne({
      where: { id, uns_a_status: true },
    });

    if (!unsafeAction) {
      throw new HttpException(
        'No se encontró la acción insegura.',
        HttpStatus.NOT_FOUND,
      );
    }

    return unsafeAction;
  }

  async updateUnsafeAction(
    id: number,
    updateUnsafeActionDto: UpdateUnsafeActionDto,
  ) {
    if (!updateUnsafeActionDto) {
      throw new HttpException(
        'Los datos para actualizar la acción insegura son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneUnsafeActions(id);

    if (updateUnsafeActionDto.uns_a_name) {
      const duplicateName = await this.unsafeActionRepository.findOne({
        where: {
          id: Not(id),
          uns_a_name: updateUnsafeActionDto.uns_a_name,
          uns_a_status: true,
        },
      });

      if (duplicateName) {
        throw new HttpException(
          `El nombre de la acción insegura ya existe.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const result = await this.unsafeActionRepository.update(
      id,
      updateUnsafeActionDto,
    );

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar la acción insegura.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteUnsafeAction(id: number) {
    const unsafeActionFound = await this.unsafeActionRepository.findOneBy({
      id,
    });

    if (!unsafeActionFound) {
      throw new HttpException(
        `Acción insegura no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.unsafeActionRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar la acción insegura.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
