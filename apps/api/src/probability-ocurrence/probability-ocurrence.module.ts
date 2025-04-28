import { Module } from '@nestjs/common';
import { ProbabilityOcurrenceService } from './services/probability-ocurrence.service';
import { ProbabilityOcurrenceController } from './controllers/probability-ocurrence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProbabilityOcurrence } from './entities/probability-ocurrence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProbabilityOcurrence])],
  controllers: [ProbabilityOcurrenceController],
  providers: [ProbabilityOcurrenceService],
})
export class ProbabilityOcurrenceModule {}
