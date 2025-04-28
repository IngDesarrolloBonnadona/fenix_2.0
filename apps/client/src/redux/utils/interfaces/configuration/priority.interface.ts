interface Priority {
  id: number;
  prior_severityclasif_id_fk: number;
  prior_name: string;
  prior_description: string;
  prior_responsetime: number;
  prior_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}

