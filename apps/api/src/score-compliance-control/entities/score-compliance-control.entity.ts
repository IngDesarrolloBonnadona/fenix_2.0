import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_score_compliance_control' })
export class ScoreComplianceControl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  sco_name: string;

  @Column()
  sco_percentage: number;

  @Column({ default: true })
  sco_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
