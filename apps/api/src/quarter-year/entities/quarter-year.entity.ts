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

@Entity({ name: 'fenix_quarter_year' })
export class QuarterYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  qua_name: string;

  @Column()
  qua_number: number;

  @Column({ default: true })
  qua_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => ControlEvaluation,
    (controlEvaluation) => controlEvaluation.quarterYear,
  )
  controlEvaluation: ControlEvaluation[];
}
