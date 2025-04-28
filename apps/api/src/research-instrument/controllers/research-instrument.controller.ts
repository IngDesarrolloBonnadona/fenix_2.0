import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { ResearchInstrumentService } from '../services/research-instrument.service';
import { CreateResearchInstrumentDto } from '../dto/create-research-instrument.dto';
import { UpdateResearchInstrumentDto } from '../dto/update-research-instrument.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('research-instrument')
@Controller('research-instrument')
@ApiBearerAuth()
export class ResearchInstrumentController {
  constructor(
    private readonly researchInstrumentService: ResearchInstrumentService,
  ) {}

  @Post('/createResearchInstrument/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createResearchInstrument(
    @Body() createResearchInstrumentDto: CreateResearchInstrumentDto,
  ) {
    return this.researchInstrumentService.createResearchInstrument(
      createResearchInstrumentDto,
    );
  }

  @Get('/listResearchInstruments/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listResearchInstruments() {
    return this.researchInstrumentService.findAllResearchInstruments();
  }

  @Get('/findResearchInstrument/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findResearchInstrument(@Param('id') id: number) {
    return this.researchInstrumentService.findOneResearchInstrument(id);
  }

  @Patch('/updateResearchInstrument/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateResearchInstrument(
    @Param('id') id: number,
    @Body() updateResearchInstrumentDto: UpdateResearchInstrumentDto,
  ) {
    return this.researchInstrumentService.updateResearchInstrument(
      id,
      updateResearchInstrumentDto,
    );
  }

  @Delete('/deleteResearchInstrument/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteResearchInstrument(@Param('id') id: number) {
    return this.researchInstrumentService.deleteResearchInstrument(id);
  }
}
