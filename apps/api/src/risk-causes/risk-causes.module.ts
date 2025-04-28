import { Module } from '@nestjs/common';
import { RiskCausesService } from './services/risk-causes.service';
import { RiskCausesController } from './controllers/risk-causes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskCause } from './entities/risk-cause.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RiskCause])],
  controllers: [RiskCausesController],
  providers: [RiskCausesService],
})
export class RiskCausesModule {}
