import { CaseReportOriginal } from 'src/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/case-report-validate/entities/case-report-validate.entity';
import { Event } from 'src/event/entities/event.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_risk_type' })
export class RiskType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  ris_t_name: string;

  @Column({ type: 'varchar', nullable: true })
  ris_t_description: string;

  @Column({ default: true })
  ris_t_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.riskType,
  )
  caseReportOriginal: CaseReportOriginal[];

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.riskType,
  )
  caseReportValidate: CaseReportValidate[];

  @OneToMany(() => Event, (event) => event.riskType)
  event: Event[];
}
