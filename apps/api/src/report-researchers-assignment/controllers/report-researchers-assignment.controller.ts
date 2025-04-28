import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ResearchersService } from '../services/report-researchers-assignment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateReportResearcherAssignmentDto } from '../dto/create-report-researcher-assignment.dto';
import { UpdateReportResearcherAssignmentDto } from '../dto/update-report-researcher-assignment.dto';
import { QueryReportResearchersAssignmentDto } from '../dto/query-report-researcher-assignment.dto';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('report-researchers-assignment')
@Controller('report-researchers-assignment')
@ApiBearerAuth()
export class ReportResearchersAssignmentController {
  constructor(private readonly researchersService: ResearchersService) {}

  @Get('findAssignedResearchByCaseId/:caseId')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findAssignedResearchByCaseId(@Param('caseId') caseId: string) {
    return this.researchersService.findAssignedResearchByCaseId(caseId);
  }

  @Get('findAssignedResearcherByIdNumberAnalyst/:IdNumberAnalyst')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findAssignedResearcherByIdNumberAnalyst(
    @Param('IdNumberAnalyst') IdNumberAnalyst: string,
  ) {
    return this.researchersService.findAssignedResearcherByIdNumberAnalyst(
      IdNumberAnalyst,
    );
  }

  @Get('/summaryReportsAsignedByIdNumberResearcher/:idNumberResearcher/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async summaryReportsAsignedByIdNumberResearcher(
    @Param('idNumberResearcher') idNumberResearcher: string,
  ) {
    return await this.researchersService.summaryReportsAsignedByIdNumberResearcher(
      idNumberResearcher,
    );
  }

  @Get('/summaryReportsMyAssignedCases/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async summaryReportsMyAssignedCases(
    @Query() query: QueryReportResearchersAssignmentDto,
  ) {
    return await this.researchersService.summaryReportsMyAssignedCases(
      query.filingNumber,
      query.patientDoc,
      query.caseTypeId,
      query.eventId,
      query.priorityId,
    );
  }

  @Get('/summaryReportsMyCasesByCharacterization/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async summaryReportsMyCasesByCharacterization(
    @Query() query: QueryReportResearchersAssignmentDto,
  ) {
    return await this.researchersService.summaryReportsMyCasesByCharacterization(
      query.filingNumber,
      query.statusMovementId,
      query.caseTypeId,
      query.eventId,
      query.priorityId,
    );
  }

  @Post(
    'assingResearcher/:idAnalyst/:idNumberResearcher/:emailResearcher/:fullNameResearcher',
  )
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createAssingResearcher(
    @Body() createResearcherDto: CreateReportResearcherAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: string,
    @Param('idNumberResearcher') idNumberResearcher: string,
    @Param('emailResearcher') emailResearcher: string,
    @Param('fullNameResearcher') fullNameResearcher: string,
  ) {
    return this.researchersService.assingResearcher(
      createResearcherDto,
      clientIp,
      idAnalyst,
      idNumberResearcher,
      emailResearcher,
      fullNameResearcher,
    );
  }

  @Patch('reAssignResearch/:idAnalyst/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateReAssignedResearch(
    @Body() updateResearcherDto: UpdateReportResearcherAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: string,
  ) {
    return this.researchersService.reAssignResearcher(
      updateResearcherDto,
      clientIp,
      idAnalyst,
    );
  }

  @Patch(
    'returnCaseToAnalyst/:idResearcher/:idCaseReportValidate/:userName/:userEmail',
  )
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateReturnCaseToAnalyst(
    @Param('idResearcher') idResearcher: string,
    @Param('idCaseReportValidate') idCaseReportValidate: string,
    @Ip() clientIp: string,
    @Param('userName') userName: string,
    @Param('userEmail') userEmail: string,
  ) {
    return this.researchersService.returnCaseToAnalyst(
      idCaseReportValidate,
      clientIp,
      idResearcher,
      userName,
      userEmail,
    );
  }

  @Delete('deleteAssignedResearch/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteAssignedResearch(@Param('id') id: number) {
    return this.researchersService.deleteAssignedResearcher(id);
  }
}
