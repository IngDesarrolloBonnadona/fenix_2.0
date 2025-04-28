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

@Entity({ name: 'fenix_risk_consequence' })
export class RiskConsequence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  ris_co_name: string;

  @Column()
  ris_co_event_id: number;

  @Column({ default: true })
  ris_co_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Event, (event) => event.riskConsequence)
  @JoinColumn({ name: 'ris_co_event_id' })
  event: Event;
}
