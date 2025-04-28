interface ObservationReturnCase {
  id: number;
  rec_o_reasonreturn_id_fk: number;
  rec_o_validatedcase_id_fk: string;
  rec_o_user_id: string;
  rec_o_observation: string;
  rec_o_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
  reasonReturnCase?: ReasonReturnCase;
}
