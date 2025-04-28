import { Module } from '@nestjs/common';
import { VascularAccessResearchInstrumentService } from './services/vascular-access-research-instrument.service';
import { VascularAccessResearchInstrumentController } from './controllers/vascular-access-research-instrument.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VascularAccessResearchInstrument } from './entities/vascular-access-research-instrument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VascularAccessResearchInstrument])],
  controllers: [VascularAccessResearchInstrumentController],
  providers: [VascularAccessResearchInstrumentService],
})
export class VascularAccessResearchInstrumentModule {}
