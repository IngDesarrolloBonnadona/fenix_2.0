import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCharacterizationCaseDto } from '../dto/create-characterization-case.dto';
import { UpdateCharacterizationCaseDto } from '../dto/update-characterization-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterizationCase } from '../entities/characterization-case.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class CharacterizationCasesService {
  constructor(
    @InjectRepository(CharacterizationCase)
    private readonly characterizationCaseRepository: Repository<CharacterizationCase>,
  ) {}

  async createCharacterization(
    createCharacterizationCaseDto: CreateCharacterizationCaseDto,
  ) {
    if (
      !createCharacterizationCaseDto ||
      !createCharacterizationCaseDto.cha_c_name
    ) {
      throw new HttpException(
        'El nombre de la caracterización de los casos es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findCharacterization =
      await this.characterizationCaseRepository.findOne({
        where: {
          cha_c_name: createCharacterizationCaseDto.cha_c_name,
          cha_c_status: true,
        },
      });

    if (findCharacterization) {
      throw new HttpException(
        'La caracterización de los casos ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const characterization = this.characterizationCaseRepository.create(
      createCharacterizationCaseDto,
    );

    await this.characterizationCaseRepository.save(characterization);

    return new HttpException(
      `¡La caracterización ${characterization.cha_c_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllCharacterizations() {
    const characterization = await this.characterizationCaseRepository.find({
      where: {
        cha_c_status: true,
      },
      order: {
        cha_c_name: 'ASC',
      },
    });

    if (characterization.length === 0) {
      throw new HttpException(
        'No se encontró la lista de caracterización de los casos',
        HttpStatus.NOT_FOUND,
      );
    }
    return characterization;
  }

  async findOneCharacterization(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador de la caracterización es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const characterization = await this.characterizationCaseRepository.findOne({
      where: { id, cha_c_status: true },
    });

    if (!characterization) {
      throw new HttpException(
        'No se encontró la caracterización de los casos',
        HttpStatus.NOT_FOUND,
      );
    }

    return characterization;
  }

  async updateCharacterization(
    id: number,
    updateCharacterizationCaseDto: UpdateCharacterizationCaseDto,
  ) {
    if (!updateCharacterizationCaseDto) {
      throw new HttpException(
        'Los datos para actualizar la caracterización de los casos son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneCharacterization(id);

    if (updateCharacterizationCaseDto.cha_c_name) {
      const duplicateName = await this.characterizationCaseRepository.findOne({
        where: {
          id: Not(id),
          cha_c_name: updateCharacterizationCaseDto.cha_c_name,
          cha_c_status: true,
        },
      });

      if (duplicateName) {
        throw new HttpException(
          `El nombre de la caracterización del caso ya existe.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const result = await this.characterizationCaseRepository.update(
      id,
      updateCharacterizationCaseDto,
    );

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar la caracterización de los casos`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteCharacterization(id: number) {
    const CharacterizationCaseFound =
      await this.characterizationCaseRepository.findOneBy({ id });

    if (!CharacterizationCaseFound) {
      throw new HttpException(
        `Caracterización de caso no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }
    const result = await this.characterizationCaseRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar la caracterización de los casos`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
