import { Event } from 'src/event/entities/event.entity';
import { Service } from 'src/service/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_unit' })
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // unit_service_id_fk: number;

  @Column({ type: 'varchar' })
  unit_name: string;

  @Column({ type: 'varchar', nullable: true })
  unit_description: string;

  @Column({ default: true })
  unit_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Service, (service) => service.unit)
  service: Service[];

  @OneToMany(() => Event, (event) => event.unit)
  event: Event[];
}
