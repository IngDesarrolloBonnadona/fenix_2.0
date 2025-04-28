interface Log {
  id: number;
  log_validatedcase_id_fk: string;
  log_user_id: string;
  log_action: string;
  log_ip: string;
  log_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
