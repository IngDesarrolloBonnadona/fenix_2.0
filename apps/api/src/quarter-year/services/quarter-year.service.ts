import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuarterYearDto } from '../dto/create-quarter-year.dto';
import { UpdateQuarterYearDto } from '../dto/update-quarter-year.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuarterYear } from '../entities/quarter-year.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuarterYearService {
  constructor(
    @InjectRepository(QuarterYear)
    private readonly quarterYearRepository: Repository<QuarterYear>,
  ) {}

  create(createQuarterYearDto: CreateQuarterYearDto) {
    return 'This action adds a new quarterYear';
  }

  async findAllQuarterYear() {
    const quarterYear = await this.quarterYearRepository.find({
      where: { qua_status: true },
    });

    if (quarterYear.length === 0) {
      throw new HttpException(
        'No se encontró la lista de trimestres.',
        HttpStatus.NOT_FOUND,
      );
    }
    return quarterYear;
  }

  findOne(id: number) {
    return `This action returns a #${id} quarterYear`;
  }

  update(id: number, updateQuarterYearDto: UpdateQuarterYearDto) {
    return `This action updates a #${id} quarterYear`;
  }

  remove(id: number) {
    return `This action removes a #${id} quarterYear`;
  }
}
