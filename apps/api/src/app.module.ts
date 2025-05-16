import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseReportOriginalModule } from './case-report-original/case-report-original.module';
import { CaseTypeModule } from './case-type/case-type.module';
import { RiskTypeModule } from './risk-type/risk-type.module';
import { SeverityClasificationModule } from './severity-clasification/severity-clasification.module';
import { OriginModule } from './origin/origin.module';
import { SubOriginModule } from './sub-origin/sub-origin.module';
import { RiskLevelModule } from './risk-level/risk-level.module';
import { EventTypeModule } from './event-type/event-type.module';
import { EventModule } from './event/event.module';
import { MedicineModule } from './medicine-case-report/medicine.module';
import { DeviceModule } from './device-case-report/device.module';
import { ServiceModule } from './service/service.module';
import { UnitModule } from './unit/unit.module';
import { CaseReportValidateModule } from './case-report-validate/case-report-validate.module';
import { MovementReportModule } from './movement-report/movement-report.module';
import { LogModule } from './log/log.module';
import { ReportAnalystAssignmentModule } from './report-analyst-assignment/report-analyst-assignment.module';
import { ResearchersModule } from './report-researchers-assignment/report-researchers-assignment.module';
import { PatientModule } from './patient/patient.module';
import { SynergyModule } from './synergy/synergy.module';
import { PriorityModule } from './priority/priority.module';
import { CharacterizationCasesModule } from './characterization-cases/characterization-cases.module';
import { RoleResponseTimeModule } from './role-response-time/role-response-time.module';
import { ReasonReturnCaseModule } from './reason-return-case/reason-return-case.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { ObservationReturnCaseModule } from './observation-return-case/observation-return-case.module';
import { ResearchInstrumentModule } from './research-instrument/research-instrument.module';
import { DeviceTypeModule } from './device-type/device-type.module';
import { DamageTypeModule } from './damage-type/damage-type.module';
import { FluidTypeModule } from './fluid-type/fluid-type.module';
import { InfluencingFactorModule } from './influencing-factor/influencing-factor.module';
import { FailedMeasuresModule } from './failed-measures/failed-measures.module';
import { RiskFactorModule } from './risk-factor/risk-factor.module';
import { SafetyBarriersModule } from './safety-barriers/safety-barriers.module';
import { ClinicalResearchModule } from './clinical-research/clinical-research.module';
import { ProtocolModule } from './protocol/protocol.module';
import { UnsafeActionModule } from './unsafe-action/unsafe-action.module';
import { CompressionConceptReportModule } from './compression-concept-report/compression-concept-report.module';
import { OncologyCategoryModule } from './oncology-category/oncology-category.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { AuthModule } from './auth/auth.module';
import { ObservationCancellationCaseModule } from './observation-cancellation-case/observation-cancellation-case.module';
import { ReasonCancellationCaseModule } from './reason-cancellation-case/reason-cancellation-case.module';
import { VascularAccessResearchInstrumentModule } from './vascular-access-research-instrument/vascular-access-research-instrument.module';
import { OtherCasesResearchInstrumentModule } from './other-cases-research-instrument/other-cases-research-instrument.module';
import { MedicationFluidsResearchInstrumentModule } from './medication-fluids-research-instrument/medication-fluids-research-instrument.module';
import { FallsResearchInstrumentModule } from './falls_research_instrument/falls_research_instrument.module';
import { ResearchCategoryModule } from './research_category/research_category.module';
import { OptionResearchCategoryModule } from './option_research_category/option_research_category.module';
import { RiskCausesModule } from './risk-causes/risk-causes.module';
import { RiskMitigationMeasureModule } from './risk-mitigation-measure/risk-mitigation-measure.module';
import { RiskConsequencesModule } from './risk-consequences/risk-consequences.module';
import { ImpactModule } from './impact/impact.module';
import { ProbabilityOcurrenceModule } from './probability-ocurrence/probability-ocurrence.module';
import { QuarterYearModule } from './quarter-year/quarter-year.module';
import { ScoreComplianceControlModule } from './score-compliance-control/score-compliance-control.module';
import { ControlEvaluationModule } from './control-evaluation/control-evaluation.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { UserModule } from './user/user.module';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
      // ssl: {
      //   requestCert: true,
      //   rejectUnauthorized: false,
      // },
    }),
    CaseReportOriginalModule,
    CaseTypeModule,
    RiskTypeModule,
    SeverityClasificationModule,
    OriginModule,
    SubOriginModule,
    RiskLevelModule,
    EventTypeModule,
    EventModule,
    MedicineModule,
    DeviceModule,
    ServiceModule,
    UnitModule,
    CaseReportValidateModule,
    MovementReportModule,
    LogModule,
    ReportAnalystAssignmentModule,
    ResearchersModule,
    PatientModule,
    SynergyModule,
    PriorityModule,
    CharacterizationCasesModule,
    RoleResponseTimeModule,
    ReasonReturnCaseModule,
    RolePermissionModule,
    ObservationReturnCaseModule,
    ResearchInstrumentModule,
    DeviceTypeModule,
    DamageTypeModule,
    FluidTypeModule,
    InfluencingFactorModule,
    FailedMeasuresModule,
    RiskFactorModule,
    SafetyBarriersModule,
    ClinicalResearchModule,
    ProtocolModule,
    UnsafeActionModule,
    CompressionConceptReportModule,
    OncologyCategoryModule,
    DocumentTypeModule,
    AuthModule,
    ObservationCancellationCaseModule,
    ReasonCancellationCaseModule,
    VascularAccessResearchInstrumentModule,
    OtherCasesResearchInstrumentModule,
    MedicationFluidsResearchInstrumentModule,
    FallsResearchInstrumentModule,
    ResearchCategoryModule,
    OptionResearchCategoryModule,
    RiskCausesModule,
    RiskMitigationMeasureModule,
    RiskConsequencesModule,
    ImpactModule,
    ProbabilityOcurrenceModule,
    QuarterYearModule,
    ScoreComplianceControlModule,
    ControlEvaluationModule,
    NodemailerModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
