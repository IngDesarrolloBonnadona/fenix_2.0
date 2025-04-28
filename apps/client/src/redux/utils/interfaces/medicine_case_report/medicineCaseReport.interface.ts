interface MedicineCaseReport {
  id?: number;
  med_case_id_fk?: string;
  med_code: string;
  med_name: string;
  med_description?: string;
  med_status?: boolean;
  createdAt?: string;
  updateAt?: string;
  deletedAt?: string | null;
  listMedicines?: Array<MedicineCaseReport>
}
