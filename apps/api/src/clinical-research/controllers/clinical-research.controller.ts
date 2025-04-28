import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Ip,
} from '@nestjs/common';
import { ClinicalResearchService } from '../services/clinical-research.service';
import { CreateClinicalResearchDto } from '../dto/create-clinical-research.dto';
import { UpdateClinicalResearchDto } from '../dto/update-clinical-research.dto';
import { ApiTags } from '@nestjs/swagger';
// import { Auth } from 'dist/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('clinical-research')
@Controller('clinical-research')
export class ClinicalResearchController {
  constructor(
    private readonly clinicalResearchService: ClinicalResearchService,
  ) {}

  @Post('/saveClinicalResearch/:clinicalResearchId?')
  // @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  saveClinicalResearch(
    @Body() createClinicalResearchDto: CreateClinicalResearchDto,
    @Ip() clientIp: string,
    @Param('clinicalResearchId') clinicalResearchId?: string,
  ) {
    return this.clinicalResearchService.saveClinicalResearch(
      createClinicalResearchDto,
      clientIp,
      clinicalResearchId,
    );
  }

  @Get('/listClinicalResearchs/')
  listClinicalResearchs() {
    return this.clinicalResearchService.findAllClinicalResearchs();
  }

  @Get('/findClinicalResearch/:id')
  findClinicalResearch(@Param('id') id: string) {
    return this.clinicalResearchService.findOneClinicalResearch(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateClinicalResearchDto: UpdateClinicalResearchDto,
  // ) {
  //   return this.clinicalResearchService.update(id, updateClinicalResearchDto);
  // }

  @Delete('/deleteClinicalResearch/:id')
  deleteClinicalResearch(@Param('id') id: string) {
    return this.clinicalResearchService.deleteClinicalResearch(id);
  }
}
