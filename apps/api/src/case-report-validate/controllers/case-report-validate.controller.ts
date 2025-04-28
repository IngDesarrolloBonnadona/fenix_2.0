import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { CaseReportValidateService } from '../services/case-report-validate.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindSimilarCaseReportValidateDto } from '../dto/find-similar-case-report-validate';
import { CreateReportValDto } from '../helper/val-dto-validator.helper';
import { QueryCaseReportValidateDto } from '../dto/query-case-report-validate.dto';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('case-report-validate')
@Controller('case-report-validate')
@ApiBearerAuth()
export class CaseReportValidateController {
  constructor(
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  @Post('/findReportsSimilar/:months')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async findReportsSimilar(
    @Body()
    similarCaseReportValidate: FindSimilarCaseReportValidateDto,
    @Param('months') months: number,
  ) {
    return await this.caseReportValidateService.findSimilarCaseReportsValidate(
      similarCaseReportValidate,
      months,
    );
  }

  @Post('/createReportValidate/:idValidator/:reportId/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async createReportValidate(
    @Body() createReportValDto: CreateReportValDto,
    @Ip() clientIp: string,
    @Param('reportId') reportId: string,
    @Param('idValidator') idValidator: string,
  ) {
    return await this.caseReportValidateService.createReportValidate(
      createReportValDto,
      clientIp,
      reportId,
      idValidator,
    );
  }

  @Get('/summaryReports')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async summaryReports() {
    return await this.caseReportValidateService.summaryReports();
  }

  @Get('/summaryReportsLastMonts/:months')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async summaryReportsLastMont(@Param('months') months: number) {
    return await this.caseReportValidateService.summaryReportsLastMont(months);
  }

  @Get('/validateCases/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async validateCases() {
    return await this.caseReportValidateService.validateCases();
  }

  @Get('/otherCases/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async otherCases() {
    return await this.caseReportValidateService.otherCases();
  }

  @Get('/listReportsValidate')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listReportsValidate() {
    return this.caseReportValidateService.findAllReportsValidate();
  }

  @Get('/findReportValidate/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findReportValidate(@Param('id') id: string) {
    return this.caseReportValidateService.findOneReportValidate(id);
  }

  @Get('/findReportValidateByConsecutive/:consecutive')
  // @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findReportValidateByConsecutive(@Param('consecutive') consecutive: string) {
    return this.caseReportValidateService.findOneReportValidateByConsecutive(
      consecutive,
    );
  }

  @Delete('/cancelReportValidate/:id/:idUser/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async cancelReportValidate(
    @Param('id') id: string,
    @Ip() clientIp: string,
    @Param('idUser') idUser: string,
  ) {
    return await this.caseReportValidateService.cancelReportValidate(
      id,
      clientIp,
      idUser,
    );
  }
}
