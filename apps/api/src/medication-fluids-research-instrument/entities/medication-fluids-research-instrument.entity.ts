import { ClinicalResearch } from 'src/clinical-research/entities/clinical-research.entity';
import { OptionResearchCategory } from 'src/option_research_category/entities/option_research_category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_medication_fluids_research_instrument' })
export class MedicationFluidsResearchInstrument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  inst_clinical_research_id: string;

  @Column({ type: 'boolean', default: false })
  inst_has_failure: boolean;

  @Column({ type: 'boolean', default: false })
  inst_damage: boolean;

  @Column({ type: 'text', nullable: true })
  inst_associated_with: string;

  @Column({ type: 'text', nullable: true })
  inst_clinical_context: string;

  @Column({ type: 'text', nullable: true })
  inst_other_medication_fluid_type: string;

  @Column({ type: 'text', nullable: true })
  inst_other_medication_administration: string;

  @Column({ type: 'text', nullable: true })
  inst_fluid_name: string;

  @Column({ type: 'float', nullable: true })
  inst_fluid_ph: number;

  @Column({ type: 'boolean', default: false })
  inst_adequate_infusion_time: boolean;

  @Column({ type: 'text', nullable: true })
  inst_infusion_time: string;

  @Column({ type: 'boolean', default: false })
  inst_adequate_dilution: boolean;

  @Column({ type: 'text', nullable: true })
  inst_fluid_dilution: string;

  @Column({ type: 'text', nullable: true })
  inst_other_influencing_factors: string;

  @Column({ type: 'float', nullable: true })
  inst_delay_time_hours: number;

  @Column({ type: 'float', nullable: true })
  inst_delay_time_days: number;

  @Column({ type: 'text', nullable: true })
  inst_other_insufficiently_valued: string;

  @Column({ type: 'text', nullable: true })
  inst_other_medication_fluid_error_factor: string;

  @Column({ type: 'text', nullable: true })
  inst_additional_findings: string;

  @Column({ type: 'boolean', default: false })
  inst_has_care_failures: boolean;

  @Column({ type: 'boolean', default: false })
  inst_has_incorrect_actions: boolean;

  @Column({ type: 'boolean', default: false })
  inst_has_unsafe_actions: boolean;

  @Column({ type: 'text', nullable: true })
  inst_conclusions: string;

  @Column({ type: 'boolean', default: false })
  inst_is_case_preventable: boolean;

  @Column({ type: 'boolean', default: true })
  inst_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(
    () => ClinicalResearch,
    (clinicalResearch) => clinicalResearch.medicationFluidsResearchInstrument,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'inst_clinical_research_id' })
  clinicalResearch: ClinicalResearch[];

  @ManyToMany(() => OptionResearchCategory, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'fenix_M_f_research_instrument_Option_category',
  })
  optionResearchCategory: OptionResearchCategory[];
}
