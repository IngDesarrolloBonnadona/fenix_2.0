import { Event } from 'src/event/entities/event.entity';
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

@Entity({ name: 'fenix_risk_cause' })
export class RiskCause {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  ris_c_name: string;

  @Column()
  ris_c_event_id: number;

  @Column({ default: true })
  ris_c_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Event, (event) => event.riskCause)
  @JoinColumn({ name: 'ris_c_event_id' })
  event: Event;
}
