import { Injectable } from '@nestjs/common';
import { CreateMedicationFluidsResearchInstrumentDto } from '../dto/create-medication-fluids-research-instrument.dto';
import { UpdateMedicationFluidsResearchInstrumentDto } from '../dto/update-medication-fluids-research-instrument.dto';

@Injectable()
export class MedicationFluidsResearchInstrumentService {
  create(
    createMedicationFluidsResearchInstrumentDto: CreateMedicationFluidsResearchInstrumentDto,
  ) {
    return 'This action adds a new medicationFluidsResearchInstrument';
  }

  findAll() {
    return `This action returns all medicationFluidsResearchInstrument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicationFluidsResearchInstrument`;
  }

  update(
    id: number,
    updateMedicationFluidsResearchInstrumentDto: UpdateMedicationFluidsResearchInstrumentDto,
  ) {
    return `This action updates a #${id} medicationFluidsResearchInstrument`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicationFluidsResearchInstrument`;
  }
}
