import { Module } from '@nestjs/common';
import { ObservationCancellationCaseService } from './services/observation-cancellation-case.service';
import { ObservationCancellationCaseController } from './controllers/observation-cancellation-case.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservationCancellationCase } from './entities/observation-cancellation-case.entity';
import { CaseReportValidateModule } from '../case-report-validate/case-report-validate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ObservationCancellationCase]),
    CaseReportValidateModule,
  ],
  controllers: [ObservationCancellationCaseController],
  providers: [ObservationCancellationCaseService],
})
export class ObservationCancellationCaseModule {}
