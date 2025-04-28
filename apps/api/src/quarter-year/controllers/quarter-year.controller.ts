import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuarterYearService } from '../services/quarter-year.service';
import { CreateQuarterYearDto } from '../dto/create-quarter-year.dto';
import { UpdateQuarterYearDto } from '../dto/update-quarter-year.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('quarter-year')
@Controller('quarter-year')
@ApiBearerAuth()
export class QuarterYearController {
  constructor(private readonly quarterYearService: QuarterYearService) {}

  @Post()
  create(@Body() createQuarterYearDto: CreateQuarterYearDto) {
    return this.quarterYearService.create(createQuarterYearDto);
  }

  @Get('/listQuarterYear/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listQuarterYear() {
    return this.quarterYearService.findAllQuarterYear();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quarterYearService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuarterYearDto: UpdateQuarterYearDto,
  ) {
    return this.quarterYearService.update(+id, updateQuarterYearDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quarterYearService.remove(+id);
  }
}
