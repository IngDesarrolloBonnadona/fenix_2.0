import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VascularAccessResearchInstrumentService } from '../services/vascular-access-research-instrument.service';
import { CreateVascularAccessResearchInstrumentDto } from '../dto/create-vascular-access-research-instrument.dto';
import { UpdateVascularAccessResearchInstrumentDto } from '../dto/update-vascular-access-research-instrument.dto';

@Controller('vascular-access-research-instrument')
export class VascularAccessResearchInstrumentController {
  constructor(
    private readonly vascularAccessResearchInstrumentService: VascularAccessResearchInstrumentService,
  ) {}

  @Post()
  create(
    @Body()
    createVascularAccessResearchInstrumentDto: CreateVascularAccessResearchInstrumentDto,
  ) {
    return this.vascularAccessResearchInstrumentService.create(
      createVascularAccessResearchInstrumentDto,
    );
  }

  @Get()
  findAll() {
    return this.vascularAccessResearchInstrumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vascularAccessResearchInstrumentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateVascularAccessResearchInstrumentDto: UpdateVascularAccessResearchInstrumentDto,
  ) {
    return this.vascularAccessResearchInstrumentService.update(
      +id,
      updateVascularAccessResearchInstrumentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vascularAccessResearchInstrumentService.remove(+id);
  }
}
