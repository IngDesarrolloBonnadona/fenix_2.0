import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompressionConceptReportService } from '../services/compression-concept-report.service';
import { CreateCompressionConceptReportDto } from '../dto/create-compression-concept-report.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('compression-concept-report')
@ApiBearerAuth()
@Controller('compression-concept-report')
export class CompressionConceptReportController {
  constructor(
    private readonly compressionConceptReportService: CompressionConceptReportService,
  ) {}

  @Post('/createCompressionConceptReport')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createCompressionConceptReport(
    @Body()
    createCompressionConceptReportDto: CreateCompressionConceptReportDto,
  ) {
    return this.compressionConceptReportService.createCompressionConceptReport(
      createCompressionConceptReportDto,
    );
  }

  @Get('/listCompressionConceptReports')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listCompressionConceptReports() {
    return this.compressionConceptReportService.findAllCompressionConceptReports();
  }

  @Get('/findCompressionConceptReport/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findCompressionConceptReport(@Param('id') id: number) {
    return this.compressionConceptReportService.findOneCompressionConceptReport(
      id,
    );
  }
}
