import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// @Entity({ name: 'fenix_falls_research_instrument' })
export class FallsResearchInstrument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  inst_has_failure: boolean;

  @Column({ type: 'boolean', default: false })
  inst_damage: boolean;

  @Column({ type: 'text', nullable: true })
  inst_clinical_context: string;

  @Column({ type: 'text', nullable: true })
  inst_other_influencing_factors: string;

  @Column({ nullable: true })
  inst_fall_risk_level_id: number;

  @Column({ type: 'text', nullable: true })
  inst_other_failed_measures: string;

  @Column({ nullable: true })
  inst_risk_factors_id: number;

  @Column({ type: 'text', nullable: true })
  inst_other_risk_factors: string;

  @Column({ type: 'text', nullable: true })
  inst_additional_findings: string;

  @Column({ type: 'boolean', default: false })
  inst_has_care_failures: boolean;

  @Column({ nullable: true })
  inst_safety_barriers_id: number;

  @Column({ type: 'boolean', default: false })
  inst_has_incorrect_actions: boolean;

  @Column({ type: 'boolean', default: false })
  inst_has_unsafe_actions: boolean;

  @Column({ nullable: true })
  inst_evaluation_fall_category_id: number;

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
}
