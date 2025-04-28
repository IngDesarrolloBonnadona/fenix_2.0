interface ResearchCategory {
  id: number;
  cat_r_name: string;
  cat_r_research_instrument_id: number;
  cat_r_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
  optionResearchCategory: OptionResearchCategory[];
}
