interface ClinicalResearch {
  id: string;
  res_c_isComplete: boolean;
  rec_c_user_researcher_id: string;
  res_c_research_instrument_id: number;
  res_c_research_instrument_name: string;
  res_c_vascular_instrument_id: string;
  res_c_medication_fluid_instrument_id: string;
  res_c_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
  researchInstrument?: ResearchInstrument;
  // vascularAccessResearchInstrument?: VascularAccessResearchInstrument;
  // medicationFluidsResearchInstrument?: MedicationFluidsResearchInstrument;
  caseReportValidates?: string[];
  optionResearchCategories?: number[];
  instrumentData?: {};
}
