import { Injectable } from '@nestjs/common';
import { CreateFallsResearchInstrumentDto } from '../dto/create-falls_research_instrument.dto';
import { UpdateFallsResearchInstrumentDto } from '../dto/update-falls_research_instrument.dto';

@Injectable()
export class FallsResearchInstrumentService {
  create(createFallsResearchInstrumentDto: CreateFallsResearchInstrumentDto) {
    return 'This action adds a new fallsResearchInstrument';
  }

  findAll() {
    return `This action returns all fallsResearchInstrument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fallsResearchInstrument`;
  }

  update(
    id: number,
    updateFallsResearchInstrumentDto: UpdateFallsResearchInstrumentDto,
  ) {
    return `This action updates a #${id} fallsResearchInstrument`;
  }

  remove(id: number) {
    return `This action removes a #${id} fallsResearchInstrument`;
  }
}
