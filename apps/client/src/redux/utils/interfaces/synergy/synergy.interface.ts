interface Synergy {
  id: number;
  syn_validatedcase_id_fk: string;
  syn_observations: string;
  syn_analystidnumber: string;
  syn_patientcontent: string;
  syn_possiblefaults: string;
  syn_consequences: string;
  syn_clinicalmanagement: string;
  syn_whomwasnotified: string;
  syn_evaluationdate: string;
  syn_resolutiondate: string;
  syn_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string;
  caseReportValidate?: CaseReportValidate;
}
