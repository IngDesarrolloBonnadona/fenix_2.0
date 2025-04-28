import { CaseReportValidate } from 'src/case-report-validate/entities/case-report-validate.entity';
import { MedicationFluidsResearchInstrument } from 'src/medication-fluids-research-instrument/entities/medication-fluids-research-instrument.entity';
import { ResearchInstrument } from 'src/research-instrument/entities/research-instrument.entity';
import { VascularAccessResearchInstrument } from 'src/vascular-access-research-instrument/entities/vascular-access-research-instrument.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_clinical_research' })
export class ClinicalResearch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  res_c_is_Complete: boolean;

  @Column({ type: 'text', nullable: true })
  rec_c_user_researcher_id: string;

  @Column({ nullable: true })
  res_c_research_instrument_id: number;

  @Column({ type: 'text', nullable: true })
  res_c_research_instrument_name: string;

  @Column({ type: 'text', nullable: true })
  res_c_vascular_instrument_id: string;

  @Column({ type: 'text', nullable: true })
  res_c_medication_fluid_instrument_id: string;

  @Column({ default: true })
  res_c_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => ResearchInstrument,
    (researchInstrument) => researchInstrument.clinicalResearch,
    { eager: true },
  )
  @JoinColumn({ name: 'res_c_research_instrument_id' })
  researchInstrument: ResearchInstrument;

  @OneToOne(
    () => VascularAccessResearchInstrument,
    (vascularAccessResearchInstrument) =>
      vascularAccessResearchInstrument.clinicalResearch,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'res_c_vascular_instrument_id' })
  vascularAccessResearchInstrument: VascularAccessResearchInstrument;

  @OneToOne(
    () => MedicationFluidsResearchInstrument,
    (medicationFluidsResearchInstrument) =>
      medicationFluidsResearchInstrument.clinicalResearch,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'res_c_medication_fluid_instrument_id' })
  medicationFluidsResearchInstrument: MedicationFluidsResearchInstrument;

  @ManyToMany(() => CaseReportValidate, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'fenix_Clinical_research_Case_report_validate',
  })
  caseReportValidate: CaseReportValidate[];
}
