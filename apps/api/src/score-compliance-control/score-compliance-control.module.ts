import { Module } from '@nestjs/common';
import { ScoreComplianceControlService } from './services/score-compliance-control.service';
import { ScoreComplianceControlController } from './controllers/score-compliance-control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreComplianceControl } from './entities/score-compliance-control.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScoreComplianceControl])],
  controllers: [ScoreComplianceControlController],
  providers: [ScoreComplianceControlService],
})
export class ScoreComplianceControlModule {}
