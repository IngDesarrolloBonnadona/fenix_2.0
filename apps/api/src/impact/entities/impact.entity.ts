import { ControlEvaluation } from "src/control-evaluation/entities/control-evaluation.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_impact' })
export class Impact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  imp_level: number;

  @Column({ type: 'text' })
  imp_name: string;

  @Column({ type: 'text', nullable: true })
  imp_health_impact: string;

  @Column({ type: 'text', nullable: true })
  imp_business_impact: string;

  @Column({ default: true })
  imp_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => ControlEvaluation,
    (controlEvaluation) => controlEvaluation.impact,
  )
  controlEvaluation: ControlEvaluation[];
}
