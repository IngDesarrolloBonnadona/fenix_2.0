import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OtherCasesResearchInstrumentService } from '../services/other-cases-research-instrument.service';
import { CreateOtherCasesResearchInstrumentDto } from '../dto/create-other-cases-research-instrument.dto';
import { UpdateOtherCasesResearchInstrumentDto } from '../dto/update-other-cases-research-instrument.dto';

@Controller('other-cases-research-instrument')
export class OtherCasesResearchInstrumentController {
  constructor(
    private readonly otherCasesResearchInstrumentService: OtherCasesResearchInstrumentService,
  ) {}

  @Post()
  create(
    @Body()
    createOtherCasesResearchInstrumentDto: CreateOtherCasesResearchInstrumentDto,
  ) {
    return this.otherCasesResearchInstrumentService.create(
      createOtherCasesResearchInstrumentDto,
    );
  }

  @Get()
  findAll() {
    return this.otherCasesResearchInstrumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otherCasesResearchInstrumentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateOtherCasesResearchInstrumentDto: UpdateOtherCasesResearchInstrumentDto,
  ) {
    return this.otherCasesResearchInstrumentService.update(
      +id,
      updateOtherCasesResearchInstrumentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otherCasesResearchInstrumentService.remove(+id);
  }
}
