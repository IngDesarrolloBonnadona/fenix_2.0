interface ControlEvaluation {
  id: number;
  con_e_event_id: number;
  con_e_probability_ocurrence_id: number;
  con_e_impact_id: number;
  con_e_year: number;
  con_e_quarter_year_id: number;
  con_e_materialized_case: number;
  con_e_compliance_control: number;
  con_e_is_inherent: boolean;
  con_e_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string;
  event?: Events;
  probabilityOcurrence?: ProbabilityOcurrence;
  impact?: Impact;
  quarterYear?: QuarterYear;
}
