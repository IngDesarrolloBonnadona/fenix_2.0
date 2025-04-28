import { Module } from '@nestjs/common';
import { RiskFactorService } from './services/risk-factor.service';
import { RiskFactorController } from './controllers/risk-factor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskFactor } from './entities/risk-factor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RiskFactor])],
  controllers: [RiskFactorController],
  providers: [RiskFactorService],
  exports: [RiskFactorService],
})
export class RiskFactorModule {}
