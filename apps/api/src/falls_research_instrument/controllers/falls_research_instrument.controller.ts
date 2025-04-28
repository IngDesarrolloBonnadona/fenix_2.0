import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FallsResearchInstrumentService } from '../services/falls_research_instrument.service';
import { CreateFallsResearchInstrumentDto } from '../dto/create-falls_research_instrument.dto';
import { UpdateFallsResearchInstrumentDto } from '../dto/update-falls_research_instrument.dto';

@Controller('falls-research-instrument')
export class FallsResearchInstrumentController {
  constructor(
    private readonly fallsResearchInstrumentService: FallsResearchInstrumentService,
  ) {}

  @Post()
  create(
    @Body() createFallsResearchInstrumentDto: CreateFallsResearchInstrumentDto,
  ) {
    return this.fallsResearchInstrumentService.create(
      createFallsResearchInstrumentDto,
    );
  }

  @Get()
  findAll() {
    return this.fallsResearchInstrumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fallsResearchInstrumentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFallsResearchInstrumentDto: UpdateFallsResearchInstrumentDto,
  ) {
    return this.fallsResearchInstrumentService.update(
      +id,
      updateFallsResearchInstrumentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fallsResearchInstrumentService.remove(+id);
  }
}
