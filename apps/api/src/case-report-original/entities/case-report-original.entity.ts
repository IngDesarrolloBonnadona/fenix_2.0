import { CaseReportValidate } from 'src/case-report-validate/entities/case-report-validate.entity';
import { CaseType } from 'src/case-type/entities/case-type.entity';
import { Device } from 'src/device-case-report/entities/device.entity';
import { EventType } from 'src/event-type/entities/event-type.entity';
import { Event } from 'src/event/entities/event.entity';
import { Medicine } from 'src/medicine-case-report/entities/medicine.entity';
import { MovementReport } from 'src/movement-report/entities/movement-report.entity';
import { Origin } from 'src/origin/entities/origin.entity';
import { Priority } from 'src/priority/entities/priority.entity';
import { RiskLevel } from 'src/risk-level/entities/risk-level.entity';
import { RiskType } from 'src/risk-type/entities/risk-type.entity';
import { Service } from 'src/service/entities/service.entity';
import { SeverityClasification } from 'src/severity-clasification/entities/severity-clasification.entity';
import { SubOrigin } from 'src/sub-origin/entities/sub-origin.entity';
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

@Entity({ name: 'fenix_case_report_original' })
export class CaseReportOriginal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  ori_cr_dateofcase: Date;

  @CreateDateColumn()
  ori_cr_creationdate: Date;

  @Column({ nullable: true })
  ori_cr_casetype_id_fk: number;

  @Column({ type: 'text', nullable: true })
  ori_cr_filingnumber: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_documentpatient: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_doctypepatient: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_firstnamepatient: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_secondnamepatient: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_firstlastnamepatient: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_secondlastnamepatient: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_agepatient: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_genderpatient: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_epspatient: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_diagnosticcodepatient: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_diagnosticdescriptionpatient: string;

  @Column({ nullable: true })
  ori_cr_admconsecutivepatient: number;

  @Column({ type: 'text', nullable: true })
  ori_cr_foliopatient: string;

  @Column({ nullable: true })
  ori_cr_anonymoususer: boolean;

  @Column({ type: 'text', nullable: true })
  ori_cr_fullnamereporter: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_documentreporter: string;

  @Column({ nullable: true })
  ori_cr_eventtype_id_fk: number;

  @Column({ nullable: true })
  ori_cr_originservice_id_fk: number;

  @Column({ nullable: true })
  ori_cr_reportingservice_id_fk: number;

  @Column({ nullable: true })
  ori_cr_event_id_fk: number;

  @Column({ type: 'text', nullable: true })
  ori_cr_descriptionothers: string;

  @Column({ nullable: true })
  ori_cr_risktype_id_fk: number;

  @Column({ nullable: true })
  ori_cr_severityclasif_id_fk: number;

  @Column({ nullable: true })
  ori_cr_origin_id_fk: number;

  @Column({ nullable: true })
  ori_cr_suborigin_id_fk: number;

  @Column({ nullable: true })
  ori_cr_risklevel_id_fk: number;

  @Column({ nullable: true })
  ori_cr_priority_id_fk: number;

  @Column({ nullable: true })
  ori_cr_statusmovement_id_fk: number;

  @Column({ nullable: true })
  ori_cr_characterization_id_fk: number;

  @Column({ default: false })
  ori_cr_infoprovidedfamily: boolean;

  @Column({ default: false })
  ori_cr_clinicalfollowrequired: boolean;

  @Column({ type: 'text', nullable: true })
  ori_cr_observationscharacterization: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_description: string;

  @Column({ type: 'text', nullable: true })
  ori_cr_inmediateaction: string;

  @Column({ nullable: true })
  ori_cr_materializedrisk: boolean;

  @Column({ default: true })
  ori_cr_associatedpatient: boolean;

  @Column({ default: true })
  ori_cr_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.caseReportOriginal,
  )
  caseReportValidate: CaseReportValidate[];

  @OneToMany(() => Medicine, (medicine) => medicine.caseReportOriginal)
  medicine: Medicine[];

  @OneToMany(() => Device, (device) => device.caseReportOriginal)
  device: Device[];

  @ManyToOne(
    () => MovementReport,
    (movementReport) => movementReport.caseReportOriginal,
  )
  @JoinColumn({ name: 'ori_cr_statusmovement_id_fk' })
  movementReport: MovementReport;

  @ManyToOne(() => CaseType, (caseType) => caseType.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_casetype_id_fk' })
  caseType: CaseType;

  @ManyToOne(() => RiskType, (riskType) => riskType.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_risktype_id_fk' })
  riskType: RiskType;

  @ManyToOne(
    () => SeverityClasification,
    (severityClasification) => severityClasification.caseReportOriginal,
  )
  @JoinColumn({ name: 'ori_cr_severityclasif_id_fk' })
  severityClasification: SeverityClasification;

  @ManyToOne(() => Origin, (origin) => origin.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_origin_id_fk' })
  origin: Origin;

  @ManyToOne(() => SubOrigin, (subOrigin) => subOrigin.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_suborigin_id_fk' })
  subOrigin: SubOrigin;

  @ManyToOne(() => RiskLevel, (riskLevel) => riskLevel.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_risklevel_id_fk' })
  riskLevel: RiskLevel;

  @ManyToOne(() => EventType, (eventType) => eventType.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_eventtype_id_fk' })
  eventType: EventType;

  @ManyToOne(() => Event, (event) => event.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_event_id_fk' })
  event: Event;

  @ManyToOne(() => Service, (service) => service.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_originservice_id_fk' })
  originService: Service;

  @ManyToOne(() => Service, (service) => service.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_reportingservice_id_fk' })
  reportingService: Service;

  @ManyToOne(() => Priority, (priority) => priority.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_priority_id_fk' })
  priority: Priority;
}
