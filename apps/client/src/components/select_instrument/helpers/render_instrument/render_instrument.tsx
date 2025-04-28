import { ResearchInstrumentEnum } from "@/utils/enums/research_instrument.enum";
import RICasesAssociatedWithVascularAccess from "../../r_i_cases_associated_with_vascular_access/RICasesAssociatedWithVascularAccess";

export const renderInstrumentComponent = (instrumentName: string) => {
  switch (instrumentName) {
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_VASCULAR_ACCESS:
      return <RICasesAssociatedWithVascularAccess />;
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_MEDICATION_OR_FLUIDS:
      return ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_MEDICATION_OR_FLUIDS;
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_OTHER_CASES:
      return ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_OTHER_CASES;
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_FALLS:
      return ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_FALLS;
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_ERROR_IN_DIAGNOSIS_INADEQUATE_APPROACH_OR_STAY:
      return ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_ERROR_IN_DIAGNOSIS_INADEQUATE_APPROACH_OR_STAY;
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_MEDICAL_DEVICES:
      return ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_MEDICAL_DEVICES;
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_PERFORMANCE_OF_PROCEDURES:
      return ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_PERFORMANCE_OF_PROCEDURES;
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_IDENTIFICATION_FAILURES:
      return ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_IDENTIFICATION_FAILURES;
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_BLOOD_DERIVATIVES:
      return ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_BLOOD_DERIVATIVES;
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_SKIN_LESIONS:
      return ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_SKIN_LESIONS;
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_PNEUMOTHORAX:
      return ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_PNEUMOTHORAX;
    default:
      return <p>Seleccione un instrumento para ver su contenido.</p>;
  }
};
