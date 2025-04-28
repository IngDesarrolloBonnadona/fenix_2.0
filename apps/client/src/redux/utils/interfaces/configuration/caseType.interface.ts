interface CaseType {
  id: number;
  cas_t_name: string;
  cas_t_description: string;
  cas_t_image?: string;
  cas_t_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
