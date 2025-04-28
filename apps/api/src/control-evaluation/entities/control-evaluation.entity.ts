import { Event } from 'src/event/entities/event.entity';
import { Impact } from 'src/impact/entities/impact.entity';
import { ProbabilityOcurrence } from 'src/probability-ocurrence/entities/probability-ocurrence.entity';
import { QuarterYear } from 'src/quarter-year/entities/quarter-year.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_control_evaluation' })
export class ControlEvaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  con_e_event_id: number;

  @Column({ nullable: true })
  con_e_probability_ocurrence_id: number;

  @Column({ nullable: true })
  con_e_impact_id: number;

  @Column()
  con_e_year: number;

  @Column({ nullable: true })
  con_e_quarter_year_id: number;

  @Column({ nullable: true })
  con_e_materialized_case: number;

  @Column({ nullable: true })
  con_e_compliance_control: number;

  @Column({ default: false })
  con_e_is_inherent: boolean;

  @Column({ default: true })
  con_e_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Event, (event) => event.controlEvaluation)
  @JoinColumn({ name: 'con_e_event_id' })
  event: Event;

  @ManyToOne(
    () => ProbabilityOcurrence,
    (probabilityOcurrence) => probabilityOcurrence.controlEvaluation,
  )
  @JoinColumn({ name: 'con_e_probability_ocurrence_id' })
  probabilityOcurrence: ProbabilityOcurrence;

  @ManyToOne(() => Impact, (impact) => impact.controlEvaluation)
  @JoinColumn({ name: 'con_e_impact_id' })
  impact: Impact;

  @ManyToOne(() => QuarterYear, (quarterYear) => quarterYear.controlEvaluation)
  @JoinColumn({ name: 'con_e_quarter_year_id' })
  quarterYear: QuarterYear;
}
