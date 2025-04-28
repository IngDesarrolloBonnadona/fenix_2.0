import { Module } from '@nestjs/common';
import { RiskMitigationMeasureService } from './services/risk-mitigation-measure.service';
import { RiskMitigationMeasureController } from './controllers/risk-mitigation-measure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskMitigationMeasure } from './entities/risk-mitigation-measure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RiskMitigationMeasure])],
  controllers: [RiskMitigationMeasureController],
  providers: [RiskMitigationMeasureService],
})
export class RiskMitigationMeasureModule {}
