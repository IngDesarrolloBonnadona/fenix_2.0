interface ObservationCancellationCase {
  id: number;
  cac_o_reasoncancellation_id_fk: number;
  cac_o_validatedcase_id_fk: string;
  cac_o_user_id: string;
  cac_o_observation: string;
  cac_o_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
  reasonCancellationCase?: ReasonCancellationCase;
}
