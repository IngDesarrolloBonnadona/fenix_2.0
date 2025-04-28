import { PartialType } from '@nestjs/swagger';
import { CreateMedicationFluidsResearchInstrumentDto } from './create-medication-fluids-research-instrument.dto';

export class UpdateMedicationFluidsResearchInstrumentDto extends PartialType(CreateMedicationFluidsResearchInstrumentDto) {}
