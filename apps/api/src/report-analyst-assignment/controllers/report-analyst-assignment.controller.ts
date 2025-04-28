import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Ip,
  Query,
  Patch,
} from '@nestjs/common';
import { ReportAnalystAssignmentService } from '../services/report-analyst-assignment.service';
import { CreateReportAnalystAssignmentDto } from '../dto/create-report-analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('report-analyst-assignment')
@Controller('report-analyst-assignment')
@ApiBearerAuth()
export class ReportAnalystAssignmentController {
  constructor(
    private readonly reportAnalisysAssignmentService: ReportAnalystAssignmentService,
  ) {}

  @Post(
    'assignAnalyst/:idValidator/:idNumberAnalyst/:emailAnalyst/:fullNameAnalyst/',
  )
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  assignAnalyst(
    @Body() createAnalystReporterDto: CreateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
    @Param('idNumberAnalyst') idNumberAnalyst: string,
    @Param('emailAnalyst') emailAnalyst: string,
    @Param('fullNameAnalyst') fullNameAnalyst: string,
  ) {
    return this.reportAnalisysAssignmentService.assignAnalyst(
      createAnalystReporterDto,
      clientIp,
      idValidator,
      idNumberAnalyst,
      emailAnalyst,
      fullNameAnalyst,
    );
  }

  @Post('returnCaseBetweenAnalyst/:idAnalystCurrent/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createReturnCaseBetweenAnalyst(
    @Body() createAnalystReporterDto: CreateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalystCurrent') idAnalystCurrent: string,
  ) {
    return this.reportAnalisysAssignmentService.returnCaseBetweenAnalyst(
      createAnalystReporterDto,
      clientIp,
      idAnalystCurrent,
    );
  }

  @Get('findAssignedAnalystByCaseId/:caseId/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findAssignedAnalystByCaseId(@Param('caseId') caseId: string) {
    return this.reportAnalisysAssignmentService.findAssignedAnalystByCaseId(
      caseId,
    );
  }

  @Get('/summaryReportsForAssignCases/:idAnalyst/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async summaryReportsForAssignCases(@Param('idAnalyst') idAnalyst: string) {
    return await this.reportAnalisysAssignmentService.summaryReportsForAssignCases(
      idAnalyst,
    );
  }

  @Patch('reAssignAnalyst/:idValidator/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateReAssignAnalyst(
    @Body() updateReportAnalystAssignmentDto: UpdateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
  ) {
    return this.reportAnalisysAssignmentService.reAssignAnalyst(
      updateReportAnalystAssignmentDto,
      clientIp,
      idValidator,
    );
  }

  @Patch(
    'returnCaseToValidator/:idAnalyst/:idCaseReportValidate/:userName/:userEmail',
  )
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateReturnCaseToValidator(
    @Param('idCaseReportValidate') idCaseReportValidate: string,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: string,
    @Param('userName') userName: string,
    @Param('userEmail') userEmail: string,
  ) {
    return this.reportAnalisysAssignmentService.returnCaseToValidator(
      idCaseReportValidate,
      clientIp,
      idAnalyst,
      userName,
      userEmail,
    );
  }

  @Delete('deleteAssignedAnalyst/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteAssignedAnalyst(@Param('id') id: number) {
    return this.reportAnalisysAssignmentService.deleteAssignedAnalyst(id);
  }
}
