interface Service {
  id: number;
  serv_unit_id_fk: number;
  serv_name: string;
  serv_description: string;
  serv_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
