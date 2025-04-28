import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Not, Repository } from 'typeorm';

import { CreateOncologyCategoryDto } from '../dto/create-oncology-category.dto';
import { UpdateOncologyCategoryDto } from '../dto/update-oncology-category.dto';

import { OncologyCategory } from '../entities/oncology-category.entity';

@Injectable()
export class OncologyCategoryService {
  constructor(
    @InjectRepository(OncologyCategory)
    private readonly oncologyCategoryRepository: Repository<OncologyCategory>,
  ) {}

  async createOncologyCategory(
    createOncologyCategoryDto: CreateOncologyCategoryDto,
  ) {
    if (!createOncologyCategoryDto || !createOncologyCategoryDto.onc_c_name) {
      throw new HttpException(
        'El nombre de la categoria de tratamiento es requerida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findOncologyCategory = await this.oncologyCategoryRepository.findOne({
      where: {
        onc_c_name: createOncologyCategoryDto.onc_c_name,
        onc_c_status: true,
      },
    });

    if (findOncologyCategory) {
      throw new HttpException(
        'La categoria de tratamiento ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const oncologyCategory = this.oncologyCategoryRepository.create(
      createOncologyCategoryDto,
    );
    await this.oncologyCategoryRepository.save(oncologyCategory);

    return new HttpException(
      `¡La categoria ${oncologyCategory.onc_c_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllOncologyCategories() {
    const oncologyCategories = await this.oncologyCategoryRepository.find({
      where: { onc_c_status: true },
      order: { onc_c_name: 'ASC' },
    });

    if (oncologyCategories.length === 0) {
      throw new HttpException(
        'No se encontró la lista de la categoria de tratamiento.',
        HttpStatus.NOT_FOUND,
      );
    }

    return oncologyCategories;
  }

  async findOneOncologyCategory(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador de la categoria de tratamiento es requerida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const oncologyCategory = await this.oncologyCategoryRepository.findOne({
      where: { id, onc_c_status: true },
    });

    if (!oncologyCategory) {
      throw new HttpException(
        'No se encontró la categoria de tratamiento.',
        HttpStatus.NOT_FOUND,
      );
    }

    return oncologyCategory;
  }

  async updateoncologyCategory(
    id: number,
    updatOncologyCategoryDto: UpdateOncologyCategoryDto,
  ) {
    if (!updatOncologyCategoryDto) {
      throw new HttpException(
        'Los datos para actualizar la categoria de tratamiento son requeridas.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneOncologyCategory(id);

    if (updatOncologyCategoryDto.onc_c_name) {
      const duplicateName = await this.oncologyCategoryRepository.findOne({
        where: {
          id: Not(id),
          onc_c_name: updatOncologyCategoryDto.onc_c_name,
          onc_c_status: true,
        },
      });

      if (duplicateName) {
        throw new HttpException(
          `El nombre de la categoría de tratamiento ya existe.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const result = await this.oncologyCategoryRepository.update(
      id,
      updatOncologyCategoryDto,
    );

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar la categoria de tratamiento.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteOncologyCategory(id: number) {
    const oncologyCategoryFound =
      await this.oncologyCategoryRepository.findOneBy({
        id,
      });

    if (!oncologyCategoryFound) {
      throw new HttpException(
        `Categoria de tratamiento no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.oncologyCategoryRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar la categoria de tratamiento.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
