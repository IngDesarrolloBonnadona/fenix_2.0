import { ResearchInstrumentEnum } from 'src/utils/enums/research-instrument.enum';
import { ClinicalResearch } from '../../entities/clinical-research.entity';

export async function getExistingInstrument(
  researchInstrumentName: string,
  clinicalResearch: ClinicalResearch,
) {
  let existingInstrument: any;

  if (
    researchInstrumentName ===
    ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_VASCULAR_ACCESS
  ) {
    existingInstrument = clinicalResearch.vascularAccessResearchInstrument;
  } else if (
    researchInstrumentName ===
    ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_MEDICATION_OR_FLUIDS
  ) {
    existingInstrument = clinicalResearch.medicationFluidsResearchInstrument;
  }

  return existingInstrument;
}
