import { Module } from '@nestjs/common';
import { FallsResearchInstrumentService } from './services/falls_research_instrument.service';
import { FallsResearchInstrumentController } from './controllers/falls_research_instrument.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FallsResearchInstrument } from './entities/falls_research_instrument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FallsResearchInstrument])],
  controllers: [FallsResearchInstrumentController],
  providers: [FallsResearchInstrumentService],
})
export class FallsResearchInstrumentModule {}
