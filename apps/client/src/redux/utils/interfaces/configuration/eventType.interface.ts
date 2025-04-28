interface EventType {
  id: number;
  eve_t_casetype_id_fk: number;
  eve_t_name: string;
  eve_t_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
  caseType?: CaseType;
  event?: Event;
}
