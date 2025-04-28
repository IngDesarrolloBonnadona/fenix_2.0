import { Module } from '@nestjs/common';
import { ControlEvaluationService } from './services/control-evaluation.service';
import { ControlEvaluationController } from './controllers/control-evaluation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlEvaluation } from './entities/control-evaluation.entity';
import { Event } from '../event/entities/event.entity';
import { ProbabilityOcurrence } from '../probability-ocurrence/entities/probability-ocurrence.entity';
import { Impact } from '../impact/entities/impact.entity';
import { QuarterYear } from '../quarter-year/entities/quarter-year.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ControlEvaluation,
      Event,
      ProbabilityOcurrence,
      Impact,
      QuarterYear,
    ]),
  ],
  controllers: [ControlEvaluationController],
  providers: [ControlEvaluationService],
})
export class ControlEvaluationModule {}
