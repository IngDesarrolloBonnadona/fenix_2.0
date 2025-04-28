import { ObservationCancellationCase } from 'src/observation-cancellation-case/entities/observation-cancellation-case.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_reason_cancellation_case' })
export class ReasonCancellationCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  cac_r_cause: string;

  @Column({ type: 'boolean', default: true })
  cac_r_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => ObservationCancellationCase,
    (observationCancellationCase) =>
      observationCancellationCase.reasonCancellationCase,
  )
  observationCancellationCase: ObservationCancellationCase[];
}
