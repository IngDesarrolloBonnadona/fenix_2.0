import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// @Entity({ name: 'fenix_other_cases_research_instrument' })
export class OtherCasesResearchInstrument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  inst_has_failure: boolean;

  @Column({ type: 'boolean', default: false })
  inst_damage: boolean;

  @Column({ type: 'text', nullable: true })
  inst_clinical_context: string;

  @Column({ type: 'text', nullable: true })
  inst_clinical_record_findings: string;

  @Column({ type: 'text', nullable: true })
  inst_healthcare_staff_version: string;

  @Column({ type: 'text', nullable: true })
  inst_patient_report: string;

  @Column({ type: 'text', nullable: true })
  inst_service_documentation_evidence: string;

  @Column({ type: 'text', nullable: true })
  inst_work_resources_description: string;

  @Column({ type: 'text', nullable: true })
  inst_human_resources_availability: string;

  @Column({ type: 'boolean', default: false })
  inst_has_care_failures: boolean;

  @Column({ nullable: true })
  inst_safety_barriers_id: number;

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
}
