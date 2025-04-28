import { Module } from '@nestjs/common';
import { OtherCasesResearchInstrumentService } from './services/other-cases-research-instrument.service';
import { OtherCasesResearchInstrumentController } from './controllers/other-cases-research-instrument.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtherCasesResearchInstrument } from './entities/other-cases-research-instrument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OtherCasesResearchInstrument])],
  controllers: [OtherCasesResearchInstrumentController],
  providers: [OtherCasesResearchInstrumentService],
})
export class OtherCasesResearchInstrumentModule {}
