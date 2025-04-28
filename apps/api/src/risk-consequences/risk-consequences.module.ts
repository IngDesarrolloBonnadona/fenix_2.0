import { Module } from '@nestjs/common';
import { RiskConsequencesService } from './services/risk-consequences.service';
import { RiskConsequencesController } from './controllers/risk-consequences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskConsequence } from './entities/risk-consequence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RiskConsequence])],
  controllers: [RiskConsequencesController],
  providers: [RiskConsequencesService],
})
export class RiskConsequencesModule {}
