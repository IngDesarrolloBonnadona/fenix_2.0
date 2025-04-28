import { Module } from '@nestjs/common';
import { ClinicalResearchService } from './services/clinical-research.service';
import { ClinicalResearchController } from './controllers/clinical-research.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalResearch } from './entities/clinical-research.entity';
import { CaseReportValidate } from '../case-report-validate/entities/case-report-validate.entity';
import { VascularAccessResearchInstrument } from '../vascular-access-research-instrument/entities/vascular-access-research-instrument.entity';
import { OptionResearchCategory } from '../option_research_category/entities/option_research_category.entity';
import { ResearchInstrument } from '../research-instrument/entities/research-instrument.entity';
import { MedicationFluidsResearchInstrument } from '../medication-fluids-research-instrument/entities/medication-fluids-research-instrument.entity';
import { LogModule } from '../log/log.module';
import { MovementReport } from '../movement-report/entities/movement-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClinicalResearch,
      CaseReportValidate,
      VascularAccessResearchInstrument,
      MedicationFluidsResearchInstrument,
      OptionResearchCategory,
      ResearchInstrument,
      MovementReport,
    ]),
    LogModule,
  ],
  controllers: [ClinicalResearchController],
  providers: [ClinicalResearchService],
})
export class ClinicalResearchModule {}
