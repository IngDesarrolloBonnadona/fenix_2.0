import { ControlEvaluation } from 'src/control-evaluation/entities/control-evaluation.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_probability_ocurrence' })
export class ProbabilityOcurrence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  prob_o_level: number;

  @Column({ type: 'text' })
  prob_o_name: string;

  @Column({ type: 'text', nullable: true })
  prob_o_description: string;

  @Column({ default: true })
  prob_o_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => ControlEvaluation,
    (controlEvaluation) => controlEvaluation.probabilityOcurrence,
  )
  controlEvaluation: ControlEvaluation[];
}
