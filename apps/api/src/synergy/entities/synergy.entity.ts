import { CaseReportValidate } from 'src/case-report-validate/entities/case-report-validate.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_synergy' })
export class Synergy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  syn_validatedcase_id_fk: string;

  @Column({ type: 'varchar', nullable: true })
  syn_observations: string;

  @Column({ type: 'varchar' })
  syn_analystidnumber: string;

  @Column({ type: 'varchar', nullable: true })
  syn_patientcontent: string;

  @Column({ type: 'varchar', nullable: true })
  syn_possiblefaults: string;

  @Column({ type: 'varchar', nullable: true })
  syn_consequences: string;

  @Column({ type: 'varchar', nullable: true })
  syn_clinicalmanagement: string;

  @Column({ type: 'varchar', nullable: true })
  syn_whomwasnotified: string;

  @Column({ type: 'date' })
  syn_evaluationdate: Date;

  @Column({ type: 'date', nullable: true })
  syn_resolutiondate: Date;

  @Column({ default: false })
  syn_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.synergy,
  )
  @JoinColumn({ name: 'syn_validatedcase_id_fk' })
  caseReportValidate: CaseReportValidate;
}
