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
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_vascular_access_research_instrument' })
export class VascularAccessResearchInstrument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  inst_clinical_research_id: string;

  @Column({ type: 'boolean', default: false })
  inst_has_failure: boolean;

  @Column({ type: 'boolean', default: false })
  inst_damage: boolean;

  @Column({ type: 'text', nullable: true })
  inst_clinical_context: string;

  @Column({ type: 'text', nullable: true })
  inst_other_device_type: string;

  @Column({ type: 'text', nullable: true })
  inst_other_damage_type: string;

  @Column({ type: 'text', nullable: true })
  inst_fluid_name: string;

  @Column({ type: 'boolean', default: false })
  inst_is_phlebitis_fluid: boolean;

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

  @Column({ type: 'text', nullable: true })
  inst_other_failed_measures: string;

  @Column({ type: 'text', nullable: true })
  inst_other_risk_factors: string;

  @Column({ type: 'text', nullable: true })
  inst_venipuncture_technique: string;

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

  // @OneToOne(
  //   () => ClinicalResearch,
  //   (clinicalResearch) => clinicalResearch.vascularAccessResearchInstrument,
  //   {
  //     onDelete: 'CASCADE',
  //   },
  // )
  // @JoinColumn({ name: 'inst_clinical_research_id' })
  // clinicalResearch: ClinicalResearch;

  @OneToOne(
    () => ClinicalResearch,
    (clinicalResearch) => clinicalResearch.vascularAccessResearchInstrument,
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
    name: 'fenix_V_a_research_instrument_Option_category',
  })
  optionResearchCategory: OptionResearchCategory[];
}
