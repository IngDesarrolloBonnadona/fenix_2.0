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

@Entity({ name: 'fenix_risk_mitigation_measure' })
export class RiskMitigationMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  ris_m_name: string;

  @Column()
  ris_m_event_id: number;

  @Column({ default: true })
  ris_m_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Event, (event) => event.riskMitigationMeasure)
  @JoinColumn({ name: 'ris_m_event_id' })
  event: Event;
}
