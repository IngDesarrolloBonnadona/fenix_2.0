import { CaseReportValidate } from 'src/case-report-validate/entities/case-report-validate.entity';
import { ReasonCancellationCase } from 'src/reason-cancellation-case/entities/reason-cancellation-case.entity';
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

@Entity({ name: 'fenix_observation_cancellation_case' })
export class ObservationCancellationCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cac_o_reasoncancellation_id_fk: number;

  @Column({ type: 'uuid' })
  cac_o_validatedcase_id_fk: string;

  @Column({ type: 'varchar' })
  cac_o_user_id: string;

  @Column({ type: 'varchar' })
  cac_o_observation: string;

  @Column({ type: 'boolean', default: true })
  cac_o_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => ReasonCancellationCase,
    (reasonCancellationCase) =>
      reasonCancellationCase.observationCancellationCase,
  )
  @JoinColumn({name: 'cac_o_reasoncancellation_id_fk'})
  reasonCancellationCase: ReasonCancellationCase

  @ManyToOne(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.observationReturnCase,
  )
  @JoinColumn({ name: 'cac_o_validatedcase_id_fk' })
  caseReportValidate: CaseReportValidate;
}
