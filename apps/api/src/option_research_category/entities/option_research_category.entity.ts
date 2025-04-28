import { ResearchCategory } from 'src/research_category/entities/research_category.entity';
import { VascularAccessResearchInstrument } from 'src/vascular-access-research-instrument/entities/vascular-access-research-instrument.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_option_research_category' })
export class OptionResearchCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  cat_o_name: string;

  @Column()
  cat_o_research_category_id: number;

  @Column({ type: 'boolean', default: true })
  cat_o_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => ResearchCategory,
    (researchCategory) => researchCategory.optionResearchCategory,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'cat_o_research_category_id' })
  researchCategory: ResearchCategory;
}
