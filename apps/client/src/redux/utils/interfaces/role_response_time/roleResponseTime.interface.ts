interface RoleResponseTime {
  id: number;
  rest_r_severityclasif_id_fk: number;
  rest_r_role_id_fk: number;
  rest_r_description: string;
  rest_r_responsetime: number;
  rest_r_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
