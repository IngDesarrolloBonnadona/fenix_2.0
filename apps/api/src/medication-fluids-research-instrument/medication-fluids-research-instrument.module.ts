import { Module } from '@nestjs/common';
import { MedicationFluidsResearchInstrumentService } from './services/medication-fluids-research-instrument.service';
import { MedicationFluidsResearchInstrumentController } from './controllers/medication-fluids-research-instrument.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationFluidsResearchInstrument } from './entities/medication-fluids-research-instrument.entity';
@Module({
  imports: [TypeOrmModule.forFeature([MedicationFluidsResearchInstrument])],
  controllers: [MedicationFluidsResearchInstrumentController],
  providers: [MedicationFluidsResearchInstrumentService],
})
export class MedicationFluidsResearchInstrumentModule {}
