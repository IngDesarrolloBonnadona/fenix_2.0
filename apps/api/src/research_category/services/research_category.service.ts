import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateResearchCategoryDto } from '../dto/create-research_category.dto';
import { UpdateResearchCategoryDto } from '../dto/update-research_category.dto';

import { ResearchCategory } from '../entities/research_category.entity';
import { ResearchInstrumentService } from 'src/research-instrument/services/research-instrument.service';
import { CreateOptionResearchCategoryDto } from 'src/option_research_category/dto/create-option_research_category.dto';
import { UpdateOptionResearchCategoryDto } from 'src/option_research_category/dto/update-option_research_category.dto';
import { OptionResearchCategory } from 'src/option_research_category/entities/option_research_category.entity';

@Injectable()
export class ResearchCategoryService {
  constructor(
    @InjectRepository(ResearchCategory)
    private readonly researchCategoryRepository: Repository<ResearchCategory>,

    private readonly researchInstrumentService: ResearchInstrumentService,
  ) {}

  async createResearchCategory(
    createResearchCategoryDto: CreateResearchCategoryDto,
  ) {
    if (
      !createResearchCategoryDto ||
      !createResearchCategoryDto.cat_r_name ||
      !createResearchCategoryDto.cat_r_research_instrument_id
    ) {
      throw new HttpException(
        'Algunos datos son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findResearchCategory = await this.researchCategoryRepository.findOne({
      where: {
        cat_r_name: createResearchCategoryDto.cat_r_name,
        cat_r_research_instrument_id:
          createResearchCategoryDto.cat_r_research_instrument_id,
      },
    });

    if (findResearchCategory) {
      throw new HttpException(
        'La categoría de investigación ya existe con el instrumento seleccionado.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.researchInstrumentService.findOneResearchInstrument(
      createResearchCategoryDto.cat_r_research_instrument_id,
    );

    const researchCategory = this.researchCategoryRepository.create(
      createResearchCategoryDto,
    );
    await this.researchCategoryRepository.save(researchCategory);

    return new HttpException(
      `¡La categoría de investigación ${researchCategory.cat_r_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async listResearchCategories() {
    const researchCategory = await this.researchCategoryRepository.find({
      where: { cat_r_status: true },
      order: { cat_r_name: 'ASC' },
    });

    if (researchCategory.length === 0) {
      throw new HttpException(
        'No se encontró la lista de categorías de investigación.',
        HttpStatus.NOT_FOUND,
      );
    }
    return researchCategory;
  }

  async findOneResearchCategory(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador de la categoría de investigación es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const researchCategory = await this.researchCategoryRepository.findOne({
      where: { id, cat_r_status: true },
      relations: { optionResearchCategory: true },
    });

    if (!researchCategory) {
      throw new HttpException(
        'No se encontró la categoría de investigación.',
        HttpStatus.NOT_FOUND,
      );
    }
    return researchCategory;
  }

  async findResearchCategoryByResearchInstrumentId(idInstrument: number) {
    if (!idInstrument) {
      throw new HttpException(
        'El identificador del instrumento de investigación es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const researchCategory = await this.researchCategoryRepository.find({
      where: { cat_r_research_instrument_id: idInstrument, cat_r_status: true },
      relations: { optionResearchCategory: true },
    });

    if (!researchCategory) {
      throw new HttpException(
        'No se encontró la categoría de investigación.',
        HttpStatus.NOT_FOUND,
      );
    }
    return researchCategory;
  }

  async updateResearchCategory(
    id: number,
    updateResearchCategoryDto: UpdateResearchCategoryDto,
  ) {
    if (!updateResearchCategoryDto) {
      throw new HttpException(
        'Algunos datos son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const researchCategoryFind = await this.findOneResearchCategory(id);

    await this.researchInstrumentService.findOneResearchInstrument(
      updateResearchCategoryDto.cat_r_research_instrument_id,
    );

    // Actualiza el nombre de la categoría
    if (updateResearchCategoryDto.cat_r_name) {
      researchCategoryFind.cat_r_name = updateResearchCategoryDto.cat_r_name;
    }

    // Procesar las opciones
    const newOptions = updateResearchCategoryDto.optionResearchCategory || [];
    const currentOptions = researchCategoryFind.optionResearchCategory;

    // Crear nuevas opciones
    const optionsToCreate = newOptions.filter(
      (newOption) =>
        !currentOptions.some((current) => current.id === newOption.id),
    );

    // Actualizar opciones existentes
    const optionsToUpdate = currentOptions.filter((current) =>
      newOptions.some((newOption) => newOption.id === current.id),
    );

    // Eliminar opciones no incluidas en la actualizacion
    const optionsToDelete = currentOptions.filter(
      (current) => !newOptions.some((newOption) => newOption.id === current.id),
    );

    // Crear las nuevas opciones
    optionsToCreate.forEach((newOption) => {
      const option = this.researchCategoryRepository.manager.create(
        OptionResearchCategory,
        { ...newOption, researchCategoryFind },
      );
      researchCategoryFind.optionResearchCategory.push(option);
    });

    // Actualizar las opciones existentes
    optionsToUpdate.forEach((current) => {
      const updateOption = newOptions.find(
        (newOption) => newOption.id === current.id,
      );

      if (updateOption) {
        current.cat_o_name = updateOption.cat_o_name || current.cat_o_name;
        current.cat_o_status = updateOption.cat_o_status;
      }
    });

    // Eliminar las opciones que ya no se requieren
    optionsToDelete.forEach((option) => {
      this.researchCategoryRepository.manager.remove(option);
    });

    await this.researchCategoryRepository.save(researchCategoryFind);

    return new HttpException(
      '¡Datos actualizados correctamente!',
      HttpStatus.OK,
    );
  }

  async deleteResearchCategory(id: number) {
    const researchCategoryFound =
      await this.researchCategoryRepository.findOneBy({
        id,
      });

    if (!researchCategoryFound) {
      throw new HttpException(
        'No se encontró la categoría de investigación.',
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.researchCategoryRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        'No se pudo eliminar la categoría de investigación.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`Datos eliminados correctamente.`, HttpStatus.OK);
  }
}
