import { PartialType } from '@nestjs/swagger';
import { CreateOtherCasesResearchInstrumentDto } from './create-other-cases-research-instrument.dto';

export class UpdateOtherCasesResearchInstrumentDto extends PartialType(CreateOtherCasesResearchInstrumentDto) {}
