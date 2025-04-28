import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { ReportAnalystAssignmentService } from './services/report-analyst-assignment.service';

import { ReportAnalystAssignmentController } from './controllers/report-analyst-assignment.controller';

import { LogModule } from '../log/log.module';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';

import { ReportAnalystAssignment } from './entities/report-analyst-assignment.entity';
import { CaseReportValidate } from '../case-report-validate/entities/case-report-validate.entity';
import { RoleResponseTime } from '../role-response-time/entities/role-response-time.entity';
import { RolePermission } from '../role-permission/entities/role-permission.entity';
import { CaseType } from '../case-type/entities/case-type.entity';
import { SeverityClasification } from '../severity-clasification/entities/severity-clasification.entity';
import { ReportResearcherAssignment } from '../report-researchers-assignment/entities/report-researchers-assignment.entity';
import { MovementReport } from '../movement-report/entities/movement-report.entity';
import { ObservationReturnCase } from '../observation-return-case/entities/observation-return-case.entity';
import { ObservationCancellationCase } from '../observation-cancellation-case/entities/observation-cancellation-case.entity';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReportAnalystAssignment,
      CaseReportValidate,
      RolePermission,
      RoleResponseTime,
      CaseType,
      SeverityClasification,
      ReportResearcherAssignment,
      MovementReport,
      ObservationReturnCase,
      ObservationCancellationCase,
    ]),
    LogModule,
    NodemailerModule,
    UserModule,
    HttpModule,
    forwardRef(() => CaseReportValidateModule),
  ],
  controllers: [ReportAnalystAssignmentController],
  providers: [ReportAnalystAssignmentService],
  exports: [ReportAnalystAssignmentService],
})
export class ReportAnalystAssignmentModule {}
