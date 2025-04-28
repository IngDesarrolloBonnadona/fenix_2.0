import { Injectable } from '@nestjs/common';
import { CreateVascularAccessResearchInstrumentDto } from '../dto/create-vascular-access-research-instrument.dto';
import { UpdateVascularAccessResearchInstrumentDto } from '../dto/update-vascular-access-research-instrument.dto';

@Injectable()
export class VascularAccessResearchInstrumentService {
  create(
    createVascularAccessResearchInstrumentDto: CreateVascularAccessResearchInstrumentDto,
  ) {
    return 'This action adds a new vascularAccessResearchInstrument';
  }

  findAll() {
    return `This action returns all vascularAccessResearchInstrument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vascularAccessResearchInstrument`;
  }

  update(
    id: number,
    updateVascularAccessResearchInstrumentDto: UpdateVascularAccessResearchInstrumentDto,
  ) {
    return `This action updates a #${id} vascularAccessResearchInstrument`;
  }

  remove(id: number) {
    return `This action removes a #${id} vascularAccessResearchInstrument`;
  }
}
