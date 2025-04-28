import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProbabilityOcurrenceService } from '../services/probability-ocurrence.service';
import { CreateProbabilityOcurrenceDto } from '../dto/create-probability-ocurrence.dto';
import { UpdateProbabilityOcurrenceDto } from '../dto/update-probability-ocurrence.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@Controller('probability-ocurrence')
export class ProbabilityOcurrenceController {
  constructor(
    private readonly probabilityOcurrenceService: ProbabilityOcurrenceService,
  ) {}

  @Post('/createProbabilityOcurrence/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createProbabilityOcurrence(
    @Body() createProbabilityOcurrenceDto: CreateProbabilityOcurrenceDto,
  ) {
    return this.probabilityOcurrenceService.createProbabilityOcurrence(
      createProbabilityOcurrenceDto,
    );
  }

  @Get('/listProbabilityOcurrences/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listProbabilityOcurrences() {
    return this.probabilityOcurrenceService.findAllProbabilityOcurrences();
  }

  @Get('/findProbabilityOcurrence/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findProbabilityOcurrence(@Param('id') id: number) {
    return this.probabilityOcurrenceService.findOneProbabilityOcurrence(id);
  }

  @Patch('/updateProbabilityOcurrence/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateProbabilityOcurrence(
    @Param('id') id: number,
    @Body() updateProbabilityOcurrenceDto: UpdateProbabilityOcurrenceDto,
  ) {
    return this.probabilityOcurrenceService.updateProbabilityOcurrence(
      id,
      updateProbabilityOcurrenceDto,
    );
  }

  @Delete('/deleteProbabilityOcurrence/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteProbabilityOcurrence(@Param('id') id: number) {
    return this.probabilityOcurrenceService.deleteProbabilityOcurrence(id);
  }
}
