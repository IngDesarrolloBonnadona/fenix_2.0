import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicationFluidsResearchInstrumentService } from '../services/medication-fluids-research-instrument.service';
import { CreateMedicationFluidsResearchInstrumentDto } from '../dto/create-medication-fluids-research-instrument.dto';
import { UpdateMedicationFluidsResearchInstrumentDto } from '../dto/update-medication-fluids-research-instrument.dto';

@Controller('medication-fluids-research-instrument')
export class MedicationFluidsResearchInstrumentController {
  constructor(
    private readonly medicationFluidsResearchInstrumentService: MedicationFluidsResearchInstrumentService,
  ) {}

  @Post()
  create(
    @Body()
    createMedicationFluidsResearchInstrumentDto: CreateMedicationFluidsResearchInstrumentDto,
  ) {
    return this.medicationFluidsResearchInstrumentService.create(
      createMedicationFluidsResearchInstrumentDto,
    );
  }

  @Get()
  findAll() {
    return this.medicationFluidsResearchInstrumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationFluidsResearchInstrumentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateMedicationFluidsResearchInstrumentDto: UpdateMedicationFluidsResearchInstrumentDto,
  ) {
    return this.medicationFluidsResearchInstrumentService.update(
      +id,
      updateMedicationFluidsResearchInstrumentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationFluidsResearchInstrumentService.remove(+id);
  }
}
