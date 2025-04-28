import { CaseReportOriginal } from 'src/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/case-report-validate/entities/case-report-validate.entity';
import { CharacterizationCase } from 'src/characterization-cases/entities/characterization-case.entity';
import { ControlEvaluation } from 'src/control-evaluation/entities/control-evaluation.entity';
import { EventType } from 'src/event-type/entities/event-type.entity';
import { OncologyCategory } from 'src/oncology-category/entities/oncology-category.entity';
import { RiskCause } from 'src/risk-causes/entities/risk-cause.entity';
import { RiskConsequence } from 'src/risk-consequences/entities/risk-consequence.entity';
import { RiskMitigationMeasure } from 'src/risk-mitigation-measure/entities/risk-mitigation-measure.entity';
import { RiskType } from 'src/risk-type/entities/risk-type.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_event' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eve_eventtype_id_fk: number;

  @Column({ nullable: true })
  eve_unit_id_fk: number;

  @Column({ nullable: true })
  eve_oncologycategory_id_fk: number;

  @Column({ nullable: true })
  eve_characterizationcase_id_fk: number;

  @Column({ nullable: true })
  eve_materialized_adverse_event_id: number;

  @Column({ nullable: true })
  eve_materialized_incident_id: number;

  @Column({ nullable: true })
  eve_risk_type_id: number;

  @Column({ type: 'varchar' })
  eve_name: string;

  @Column({ type: 'boolean', default: false })
  eve_deviceassociated: boolean;

  @Column({ type: 'boolean', default: false })
  eve_medicineassociated: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
  eve_stay: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
  eve_mentalhealth: boolean;

  @Column({ type: 'boolean', default: false })
  eve_publichealth: boolean;

  @Column({ type: 'boolean', default: false })
  eve_oncologicalpathology: boolean;

  @Column({ type: 'boolean', default: false })
  eve_medicines: boolean;

  @Column({ type: 'boolean', default: false })
  eve_devices: boolean;

  @Column({ type: 'boolean', default: false })
  eve_chemotherapy: boolean;

  @Column({ type: 'boolean', default: false })
  eve_cerebral: boolean;

  @Column({ type: 'boolean', default: false })
  eve_respiratory: boolean;

  @Column({ type: 'boolean', default: false })
  eve_cardiovascular: boolean;

  @Column({ type: 'boolean', default: false })
  eve_prostate: boolean;

  @Column({ type: 'boolean', default: false })
  eve_renal: boolean;

  @Column({ type: 'boolean', default: false })
  eve_gastrointestinal: boolean;

  @Column({ type: 'boolean', default: false })
  eve_metabolic: boolean;

  @Column({ type: 'boolean', default: false })
  eve_immunological: boolean;

  @Column({ type: 'boolean', default: false })
  eve_nutritional: boolean;

  @Column({ type: 'boolean', default: false })
  eve_transfusional: boolean;

  @Column({ type: 'boolean', default: false })
  eve_changesparaclinical: boolean;

  @Column({ type: 'boolean', default: false })
  eve_surgery: boolean;

  @Column({ type: 'boolean', default: false })
  eve_procedures: boolean;

  @Column({ type: 'boolean', default: false })
  eve_infectious: boolean;

  @Column({ type: 'boolean', default: true })
  eve_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => EventType, (eventType) => eventType.event)
  @JoinColumn({ name: 'eve_eventtype_id_fk' })
  eventType: EventType;

  @OneToMany(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.event,
  )
  caseReportOriginal: CaseReportOriginal[];

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.event,
  )
  caseReportValidate: CaseReportValidate[];

  @ManyToOne(() => Unit, (unit) => unit.event)
  @JoinColumn({ name: 'eve_unit_id_fk' })
  unit: Unit;

  @ManyToOne(
    () => OncologyCategory,
    (oncologyCategory) => oncologyCategory.event,
  )
  @JoinColumn({ name: 'eve_oncologycategory_id_fk' })
  oncologyCategory: OncologyCategory;

  @ManyToOne(
    () => CharacterizationCase,
    (characterizationCase) => characterizationCase.event,
  )
  @JoinColumn({ name: 'eve_characterizationcase_id_fk' })
  characterizationCase: CharacterizationCase;

  @ManyToOne(() => RiskType, (riskType) => riskType.event)
  @JoinColumn({ name: 'eve_risk_type_id' })
  riskType: RiskType;

  @OneToMany(() => RiskCause, (riskCause) => riskCause.event)
  riskCause: RiskCause[];

  @OneToMany(
    () => RiskMitigationMeasure,
    (riskMitigationMeasure) => riskMitigationMeasure.event,
  )
  riskMitigationMeasure: RiskMitigationMeasure[];

  @OneToMany(() => RiskConsequence, (riskConsequence) => riskConsequence.event)
  riskConsequence: RiskConsequence[];

  @OneToMany(
    () => ControlEvaluation,
    (controlEvaluation) => controlEvaluation.event,
  )
  controlEvaluation: ControlEvaluation[];

  // Relación reflexiva para el evento adverso materializado
  @OneToOne(() => Event)
  @JoinColumn({ name: 'eve_materialized_adverse_event_id' })
  materializedAdverseEvent: Event;

  // Relación inversa (opcional, si necesitas acceder desde el evento materializado)
  // @OneToOne(() => Event, (event) => event.materializedAdverseEvent)
  // nonMaterializedEvent: Event;

  // Relación reflexiva para el incidente materializado
  @OneToOne(() => Event)
  @JoinColumn({ name: 'eve_materialized_incident_id' })
  materializedIncident: Event;
}
