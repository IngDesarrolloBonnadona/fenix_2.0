import { OptionResearchCategory } from 'src/option_research_category/entities/option_research_category.entity';
import { ResearchInstrument } from 'src/research-instrument/entities/research-instrument.entity';
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

@Entity({ name: 'fenix_research_category' })
export class ResearchCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  cat_r_name: string;

  @Column()
  cat_r_research_instrument_id: number;

  @Column({ type: 'boolean', default: true })
  cat_r_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => OptionResearchCategory,
    (optionResearchCategory) => optionResearchCategory.researchCategory,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  optionResearchCategory: OptionResearchCategory[];

  @ManyToOne(
    () => ResearchInstrument,
    (researchInstrument) => researchInstrument.researchCategory,
    { eager: true },
  )
  @JoinColumn({ name: 'cat_r_research_instrument_id' })
  researchInstrument: ResearchInstrument;
}
