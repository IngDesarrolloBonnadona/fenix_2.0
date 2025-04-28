interface RiskMitigationMeasure {
  id: number;
  ris_m_name: string;
  ris_m_event_id: number;
  ris_m_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
