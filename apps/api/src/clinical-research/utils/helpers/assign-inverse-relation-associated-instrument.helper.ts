import { Repository } from 'typeorm';
import { ClinicalResearch } from '../../entities/clinical-research.entity';
import { VascularAccessResearchInstrument } from 'src/vascular-access-research-instrument/entities/vascular-access-research-instrument.entity';
import { ResearchInstrumentEnum } from 'src/utils/enums/research-instrument.enum';
import { MedicationFluidsResearchInstrument } from 'src/medication-fluids-research-instrument/entities/medication-fluids-research-instrument.entity';

export async function assignInverseRelationAssociatedInstrument(
  researchInstrumentName: string,
  associatedInstrument: any,
  savedClinicalResearch: ClinicalResearch,
  vascularAccessResearchInstrumentRepository: Repository<VascularAccessResearchInstrument>,
  medicationFluidsResearchInstrumentRepository: Repository<MedicationFluidsResearchInstrument>,
) {
  if (
    researchInstrumentName ===
    ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_VASCULAR_ACCESS
  ) {
    associatedInstrument.clinicalResearch = savedClinicalResearch;
    await vascularAccessResearchInstrumentRepository.save(associatedInstrument);
  } else if (
    researchInstrumentName ===
    ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_MEDICATION_OR_FLUIDS
  ) {
    associatedInstrument.clinicalResearch = savedClinicalResearch;
    await medicationFluidsResearchInstrumentRepository.save(
      associatedInstrument,
    );
  }
}
