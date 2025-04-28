import { Module } from '@nestjs/common';
import { ResearchInstrumentService } from './services/research-instrument.service';
import { ResearchInstrumentController } from './controllers/research-instrument.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearchInstrument } from './entities/research-instrument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResearchInstrument])],
  controllers: [ResearchInstrumentController],
  providers: [ResearchInstrumentService],
  exports: [ResearchInstrumentService],
})
export class ResearchInstrumentModule {}
