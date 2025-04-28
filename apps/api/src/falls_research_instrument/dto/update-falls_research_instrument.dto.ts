import { PartialType } from '@nestjs/swagger';
import { CreateFallsResearchInstrumentDto } from './create-falls_research_instrument.dto';

export class UpdateFallsResearchInstrumentDto extends PartialType(CreateFallsResearchInstrumentDto) {}
