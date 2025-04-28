import { Injectable } from '@nestjs/common';
import { CreateOtherCasesResearchInstrumentDto } from '../dto/create-other-cases-research-instrument.dto';
import { UpdateOtherCasesResearchInstrumentDto } from '../dto/update-other-cases-research-instrument.dto';

@Injectable()
export class OtherCasesResearchInstrumentService {
  create(
    createOtherCasesResearchInstrumentDto: CreateOtherCasesResearchInstrumentDto,
  ) {
    return 'This action adds a new otherCasesResearchInstrument';
  }

  findAll() {
    return `This action returns all otherCasesResearchInstrument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otherCasesResearchInstrument`;
  }

  update(
    id: number,
    updateOtherCasesResearchInstrumentDto: UpdateOtherCasesResearchInstrumentDto,
  ) {
    return `This action updates a #${id} otherCasesResearchInstrument`;
  }

  remove(id: number) {
    return `This action removes a #${id} otherCasesResearchInstrument`;
  }
}
