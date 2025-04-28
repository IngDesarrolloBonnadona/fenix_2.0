import { ReportAnalystAssignment } from 'src/report-analyst-assignment/entities/report-analyst-assignment.entity';
import { CaseReportOriginal } from 'src/case-report-original/entities/case-report-original.entity';
import { Log } from 'src/log/entities/log.entity';
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
import { Synergy } from 'src/synergy/entities/synergy.entity';
import { CaseType } from 'src/case-type/entities/case-type.entity';
import { RiskType } from 'src/risk-type/entities/risk-type.entity';
import { SeverityClasification } from 'src/severity-clasification/entities/severity-clasification.entity';
import { Origin } from 'src/origin/entities/origin.entity';
import { SubOrigin } from 'src/sub-origin/entities/sub-origin.entity';
import { RiskLevel } from 'src/risk-level/entities/risk-level.entity';
import { EventType } from 'src/event-type/entities/event-type.entity';
import { Event } from 'src/event/entities/event.entity';
import { Service } from 'src/service/entities/service.entity';
import { ReportResearcherAssignment } from 'src/report-researchers-assignment/entities/report-researchers-assignment.entity';
import { Priority } from 'src/priority/entities/priority.entity';
import { MovementReport } from 'src/movement-report/entities/movement-report.entity';
import { CharacterizationCase } from 'src/characterization-cases/entities/characterization-case.entity';
import { ObservationReturnCase } from 'src/observation-return-case/entities/observation-return-case.entity';
import { ObservationCancellationCase } from 'src/observation-cancellation-case/entities/observation-cancellation-case.entity';

@Entity({ name: 'fenix_case_report_validate' })
export class CaseReportValidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  val_cr_dateofcase: Date;

  @Column({ type: 'timestamp' })
  val_cr_creationdate: Date;

  @Column({ nullable: true })
  val_cr_consecutive_id: number;

  @Column({ nullable: true })
  val_cr_previous_id: number;

  @Column({ type: 'uuid', nullable: true })
  val_cr_originalcase_id_fk: string;

  @Column({ nullable: true })
  val_cr_casetype_id_fk: number;

  @Column({ type: 'text', nullable: true })
  val_cr_filingnumber: string;

  @Column({ type: 'text', nullable: true })
  val_cr_documentpatient: string;

  @Column({ type: 'text', nullable: true })
  val_cr_doctypepatient: string;

  @Column({ type: 'text', nullable: true })
  val_cr_firstnamepatient: string;

  @Column({ type: 'text', nullable: true })
  val_cr_secondnamepatient: string;

  @Column({ type: 'text', nullable: true })
  val_cr_firstlastnamepatient: string;

  @Column({ type: 'text', nullable: true })
  val_cr_secondlastnamepatient: string;

  @Column({ type: 'text', nullable: true })
  val_cr_agepatient: string;

  @Column({ type: 'text', nullable: true })
  val_cr_genderpatient: string;

  @Column({ type: 'text', nullable: true })
  val_cr_epspatient: string;

  @Column({ type: 'text', nullable: true })
  val_cr_diagnosticcodepatient: string;

  @Column({ type: 'text', nullable: true })
  val_cr_diagnosticdescriptionpatient: string;

  @Column({ nullable: true })
  val_cr_admconsecutivepatient: number;

  @Column({ type: 'text', nullable: true })
  val_cr_foliopatient: string;

  @Column({ nullable: true })
  val_cr_anonymoususer: boolean;

  @Column({ type: 'text', nullable: true })
  val_cr_fullnamereporter: string;

  @Column({ type: 'text', nullable: true })
  val_cr_documentreporter: string;

  @Column({ nullable: true })
  val_cr_eventtype_id_fk: number;

  @Column({ nullable: true })
  val_cr_originservice_id_fk: number;

  @Column({ nullable: true })
  val_cr_reportingservice_id_fk: number;

  @Column({ nullable: true })
  val_cr_event_id_fk: number;

  @Column({ type: 'text', nullable: true })
  val_cr_descriptionothers: string;

  @Column({ nullable: true })
  val_cr_risktype_id_fk: number;

  @Column({ nullable: true })
  val_cr_severityclasif_id_fk: number;

  @Column({ nullable: true })
  val_cr_origin_id_fk: number;

  @Column({ nullable: true })
  val_cr_suborigin_id_fk: number;

  @Column({ nullable: true }) //
  val_cr_risklevel_id_fk: number;

  @Column({ nullable: true })
  val_cr_priority_id_fk: number;

  @Column({ nullable: true })
  val_cr_statusmovement_id_fk: number;

  @Column({ nullable: true })
  val_cr_characterization_id_fk: number;

  @Column({ default: false })
  val_cr_infoprovidedfamily: boolean;

  @Column({ default: false })
  val_cr_clinicalfollowrequired: boolean;

  @Column({ type: 'text', nullable: true })
  val_cr_observationscharacterization: string;

  @Column({ type: 'text', nullable: true }) //
  val_cr_description: string;

  @Column({ type: 'text', nullable: true }) //
  val_cr_inmediateaction: string;

  @Column({ nullable: true }) //
  val_cr_materializedrisk: boolean;

  @Column({ default: true }) //
  val_cr_associatedpatient: boolean;

  @Column({ default: false })
  val_cr_validated: boolean;

  @Column({ default: true })
  val_cr_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.caseReportValidate,
  )
  @JoinColumn({ name: 'val_cr_originalcase_id_fk' })
  caseReportOriginal: CaseReportOriginal;

  @ManyToOne(() => CaseType, (caseType) => caseType.caseReportValidate)
  @JoinColumn({ name: 'val_cr_casetype_id_fk' })
  caseType: CaseType;

  @ManyToOne(() => RiskType, (riskType) => riskType.caseReportValidate)
  @JoinColumn({ name: 'val_cr_risktype_id_fk' })
  riskType: RiskType;

  @ManyToOne(
    () => SeverityClasification,
    (severityClasification) => severityClasification.caseReportValidate,
  )
  @JoinColumn({ name: 'val_cr_severityclasif_id_fk' })
  severityClasification: SeverityClasification;

  @ManyToOne(() => Origin, (origin) => origin.caseReportValidate)
  @JoinColumn({ name: 'val_cr_origin_id_fk' })
  origin: Origin;

  @ManyToOne(() => SubOrigin, (subOrigin) => subOrigin.caseReportValidate)
  @JoinColumn({ name: 'val_cr_suborigin_id_fk' })
  subOrigin: SubOrigin;

  @ManyToOne(() => RiskLevel, (riskLevel) => riskLevel.caseReportValidate)
  @JoinColumn({ name: 'val_cr_risklevel_id_fk' })
  riskLevel: RiskLevel;

  @ManyToOne(() => EventType, (eventType) => eventType.caseReportValidate)
  @JoinColumn({ name: 'val_cr_eventtype_id_fk' })
  eventType: EventType;

  @ManyToOne(() => Event, (event) => event.caseReportValidate)
  @JoinColumn({ name: 'val_cr_event_id_fk' })
  event: Event;

  @ManyToOne(() => Service, (service) => service.caseReportValidate)
  @JoinColumn({ name: 'val_cr_originservice_id_fk' })
  originService: Service;

  @ManyToOne(() => Service, (service) => service.caseReportValidate)
  @JoinColumn({ name: 'val_cr_reportingservice_id_fk' })
  reportingService: Service;

  @ManyToOne(() => Priority, (priority) => priority.caseReportValidate)
  @JoinColumn({ name: 'val_cr_priority_id_fk' })
  priority: Priority;

  @ManyToOne(
    () => MovementReport,
    (movementReport) => movementReport.caseReportValidate,
  )
  @JoinColumn({ name: 'val_cr_statusmovement_id_fk' })
  movementReport: MovementReport;

  @ManyToOne(
    () => CharacterizationCase,
    (characterizationCase) => characterizationCase.caseReportValidate,
  )
  @JoinColumn({ name: 'val_cr_characterization_id_fk' })
  characterizationCase: CharacterizationCase;

  @OneToMany(() => Log, (log) => log.caseReportValidate)
  log: Log[];

  @OneToMany(
    () => ReportAnalystAssignment,
    (reportAnalystAssignment) => reportAnalystAssignment.caseReportValidate,
  )
  reportAnalystAssignment: ReportAnalystAssignment[];

  @OneToMany(() => Synergy, (synergy) => synergy.caseReportValidate)
  synergy: Synergy[];

  @OneToMany(
    () => ReportResearcherAssignment,
    (reportResearcherAssignment) =>
      reportResearcherAssignment.caseReportValidate,
  )
  reportResearcherAssignment: ReportResearcherAssignment[];

  @OneToMany(
    () => ObservationReturnCase,
    (observationReturnCase) => observationReturnCase.caseReportValidate,
  )
  observationReturnCase: ObservationReturnCase[];

  @OneToMany(
    () => ObservationCancellationCase,
    (observationCancellationCase) =>
      observationCancellationCase.caseReportValidate,
  )
  observationCancellationCase: ObservationCancellationCase[];
}
