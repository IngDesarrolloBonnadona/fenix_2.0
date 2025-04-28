import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UpdateReportResearcherAssignmentDto } from '../dto/update-report-researcher-assignment.dto';
import { CreateReportResearcherAssignmentDto } from '../dto/create-report-researcher-assignment.dto';
import { SendEmailDto } from 'src/nodemailer/dto/send_email.dto';

import { ReportResearcherAssignment } from '../entities/report-researchers-assignment.entity';
import { MovementReport } from 'src/movement-report/entities/movement-report.entity';
import { CaseReportValidate } from 'src/case-report-validate/entities/case-report-validate.entity';
import { CaseType } from 'src/case-type/entities/case-type.entity';
import { SeverityClasification } from 'src/severity-clasification/entities/severity-clasification.entity';
import { RolePermission } from 'src/role-permission/entities/role-permission.entity';
import { RoleResponseTime } from 'src/role-response-time/entities/role-response-time.entity';
import { ReportAnalystAssignment } from 'src/report-analyst-assignment/entities/report-analyst-assignment.entity';
import { ObservationReturnCase } from 'src/observation-return-case/entities/observation-return-case.entity';

import { CaseReportValidateService } from 'src/case-report-validate/services/case-report-validate.service';
import { LogService } from 'src/log/services/log.service';
import { NodemailerService } from 'src/nodemailer/services/nodemailer.service';
import { UserService } from 'src/user/services/user.service';

import { LogReportsEnum } from 'src/utils/enums/logs.enum';
import { MovementReportEnum } from 'src/utils/enums/movement-report.enum';
import { CaseTypeReportEnum } from 'src/utils/enums/caseType-report.enum';
import { SeverityClasificationEnum } from 'src/utils/enums/severity-clasif.enum';
import { UserRolesEnum } from 'src/utils/enums/user-roles.enum';
import { SentinelTimeEnum } from 'src/utils/enums/sentinel-time.enum';
import { SUPPORT_CONTACT_EMAIL } from 'src/utils/constants/constants';

import {
  CASE_RETURNED_BY_RESEARCHER,
  RESEARCHER_ASSIGNED,
  SUBJECT_CASE_RETURNED_BY_RESEARCHER,
  SUBJECT_RESEARCHER_ASSIGNED,
} from 'src/nodemailer/constants/email_config.constant';

@Injectable()
export class ResearchersService {
  constructor(
    @InjectRepository(ReportResearcherAssignment)
    private readonly reportResearcherAssignmentRepository: Repository<ReportResearcherAssignment>,
    @InjectRepository(CaseReportValidate)
    private readonly caseReportValidateRepository: Repository<CaseReportValidate>,
    @InjectRepository(CaseType)
    private readonly caseTypeRepository: Repository<CaseType>,
    @InjectRepository(SeverityClasification)
    private readonly severityClasificationRepository: Repository<SeverityClasification>,
    @InjectRepository(RolePermission)
    private readonly roleRepository: Repository<RolePermission>,
    @InjectRepository(RoleResponseTime)
    private readonly roleResponseTimeRepository: Repository<RoleResponseTime>,
    @InjectRepository(ReportAnalystAssignment)
    private readonly reportAnalystAssignmentRepository: Repository<ReportAnalystAssignment>,
    @InjectRepository(MovementReport)
    private readonly movementReportRepository: Repository<MovementReport>,
    @InjectRepository(ObservationReturnCase)
    private readonly observationReturnCaseRepository: Repository<ObservationReturnCase>,

    private readonly nodemailerService: NodemailerService,
    private readonly logService: LogService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => CaseReportValidateService))
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}
  async assingResearcher(
    createResearcherDto: CreateReportResearcherAssignmentDto,
    clientIp: string,
    idAnalyst: string,
    idNumberResearcher: string,
    emailResearcher: string,
    fullNameResearcher: string,
  ) {
    if (
      !createResearcherDto ||
      !createResearcherDto.res_validatedcase_id_fk ||
      !createResearcherDto.res_positionname
    ) {
      throw new HttpException(
        'Algunos datos para asignar investigador son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idAnalyst) {
      throw new HttpException(
        'El identificador del analista es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const reportAssignmentFind =
      await this.reportResearcherAssignmentRepository.findOne({
        where: {
          res_validatedcase_id_fk: createResearcherDto.res_validatedcase_id_fk,
          res_status: true,
          res_isreturned: false,
        },
      });

    if (reportAssignmentFind) {
      throw new HttpException(
        'El reporte ya tiene un investigador asignado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const caseValidateFound =
      await this.caseReportValidateService.findOneReportValidate(
        createResearcherDto.res_validatedcase_id_fk,
      );

    const findCaseType = await this.caseTypeRepository.findOne({
      where: {
        cas_t_name: CaseTypeReportEnum.ADVERSE_EVENT,
        cas_t_status: true,
      },
    });

    if (!findCaseType) {
      throw new HttpException(
        `El tipo de caso ${CaseTypeReportEnum.ADVERSE_EVENT} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const findSeverityClasification =
      await this.severityClasificationRepository.findOne({
        where: {
          sev_c_name: SeverityClasificationEnum.SERIOUS_SEVERITY,
          sev_c_status: true,
        },
      });

    if (!findSeverityClasification) {
      throw new HttpException(
        `La clasificacion de severidad ${SeverityClasificationEnum.SERIOUS_SEVERITY} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const findIdRole = await this.roleRepository.findOne({
      where: {
        role_name: UserRolesEnum.INVESTIGATOR,
        role_status: true,
      },
    });

    if (!findIdRole) {
      throw new HttpException(
        `El rol ${UserRolesEnum.INVESTIGATOR} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const findRoleResponseTime = await this.roleResponseTimeRepository.findOne({
      where: {
        rest_r_role_id_fk: findIdRole.id,
        rest_r_severityclasif_id_fk:
          caseValidateFound.val_cr_severityclasif_id_fk,
        rest_r_status: true,
      },
    });

    if (!findRoleResponseTime) {
      throw new HttpException(
        `El tiempo de respuesta del rol ${UserRolesEnum.INVESTIGATOR} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.ASSIGNMENT_RESEARCHER,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(`El movimiento no existe.`, HttpStatus.NOT_FOUND);
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      createResearcherDto.res_validatedcase_id_fk,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    let responseTime = findRoleResponseTime.rest_r_responsetime;

    if (
      findCaseType.id === caseValidateFound.val_cr_casetype_id_fk &&
      findSeverityClasification.id ===
        caseValidateFound.val_cr_severityclasif_id_fk
    ) {
      responseTime = SentinelTimeEnum.SENTINEL_TIME;
    }

    const research = this.reportResearcherAssignmentRepository.create({
      ...createResearcherDto,
      res_useranalyst_id: idAnalyst,
      res_userresearch_id: idNumberResearcher,
      res_days: responseTime,
    });

    const assigned =
      await this.reportResearcherAssignmentRepository.save(research);

    await this.logService.createLog(
      assigned.res_validatedcase_id_fk,
      idAnalyst,
      clientIp,
      LogReportsEnum.LOG_ASSIGNMENT_RESEARCHER,
    );

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [emailResearcher];
    emailDetailsToSend.userNameToEmail = fullNameResearcher;
    emailDetailsToSend.caseFilingNumberToEmail =
      caseValidateFound.val_cr_filingnumber;
    emailDetailsToSend.subject = SUBJECT_RESEARCHER_ASSIGNED;
    emailDetailsToSend.emailTemplate = RESEARCHER_ASSIGNED;
    emailDetailsToSend.fenixUrl = process.env.FENIX_URL;
    emailDetailsToSend.supportContactEmail = SUPPORT_CONTACT_EMAIL;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return new HttpException(
      `¡El investigador se asignó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAssignedResearcherByIdNumberAnalyst(IdNumberAnalyst: string) {
    if (!IdNumberAnalyst) {
      throw new HttpException(
        'El identificador del analista es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const researchersFound =
      await this.reportResearcherAssignmentRepository.find({
        where: {
          res_useranalyst_id: IdNumberAnalyst,
          res_status: true,
          res_isreturned: false,
        },
      });

    if (!researchersFound) {
      throw new HttpException(
        'No se encontró los investigadores asignados por el analista.',
        HttpStatus.NOT_FOUND,
      );
    }
    return researchersFound;
  }

  async summaryReportsAsignedByIdNumberResearcher(idNumberResearcher: string) {
    if (!idNumberResearcher) {
      throw new HttpException(
        'El identificador del investigador es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const CASE_VALIDATED = false;
    const CASE_ACTIVE_STATUS = true;
    const ASIGNED_RESEARCHER_STATUS = true;
    const IS_CASE_RESEARCHER_RETURNED = false;

    const query = this.caseReportValidateRepository
      .createQueryBuilder('crv')
      .innerJoinAndSelect('crv.reportResearcherAssignment', 'res')
      .leftJoinAndSelect('crv.caseType', 'caseType')
      .leftJoinAndSelect('crv.event', 'event')
      .leftJoinAndSelect('crv.priority', 'priority')
      .leftJoinAndSelect(
        'crv.reportAnalystAssignment',
        'reportAnalystAssignment',
      )
      // .leftJoinAndSelect(
      //   'crv.clinicalResearchCaseReportValidate',
      //   'clinicalResearchCaseReportValidate',
      // )
      .where('crv.val_cr_validated = :validated', { validated: CASE_VALIDATED })
      .andWhere('crv.val_cr_status = :status', { status: CASE_ACTIVE_STATUS })
      .andWhere('res.res_userresearch_id = :idNumberResearcher', {
        idNumberResearcher,
      })
      .andWhere('res.res_status = :researcherStatusBool', {
        researcherStatusBool: ASIGNED_RESEARCHER_STATUS,
      })
      .andWhere('res.res_isreturned = :isCaseResearcherReturnedBool', {
        isCaseResearcherReturnedBool: IS_CASE_RESEARCHER_RETURNED,
      })
      .orderBy('res.createdAt', 'DESC');

    const caseReportsValidate = await query.getMany();

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsValidate;
  }

  async summaryReportsMyAssignedCases(
    filingNumber?: string,
    patientDoc?: string,
    caseTypeId?: number,
    eventId?: number,
    priorityId?: number,
  ) {
    const query = this.caseReportValidateRepository
      .createQueryBuilder('crv')
      .innerJoinAndSelect('crv.reportResearcherAssignment', 'res')
      .leftJoinAndSelect('crv.caseType', 'caseType')
      .leftJoinAndSelect('crv.event', 'event')
      .leftJoinAndSelect('crv.priority', 'priority')
      .leftJoinAndSelect(
        'crv.reportAnalystAssignment',
        'reportAnalystAssignment',
      )
      .leftJoinAndSelect(
        'crv.clinicalResearchCaseReportValidate',
        'clinicalResearchCaseReportValidate',
      )
      .where('crv.val_cr_validated = :validated', { validated: false })
      .andWhere('crv.val_cr_status = :status', { status: true });

    if (filingNumber) {
      query.andWhere('crv.val_cr_filingnumber LIKE :filingNumber', {
        filingNumber: `%${filingNumber}%`,
      });
    }

    if (patientDoc) {
      query.andWhere('crv.val_cr_documentpatient LIKE :patientDoc', {
        patientDoc: `%${patientDoc}%`,
      });
    }

    if (caseTypeId) {
      query.andWhere('crv.val_cr_casetype_id_fk = :caseTypeId', { caseTypeId });
    }

    if (eventId) {
      query.andWhere('crv.val_cr_event_id_fk = :eventId', { eventId });
    }

    if (priorityId) {
      query.andWhere('crv.val_cr_priority_id_fk = :priorityId', { priorityId });
    }

    query.andWhere('res.res_status = :statusBool', {
      statusBool: true,
    });

    query.andWhere('res.res_isreturned = :isReturnedBool', {
      isReturnedBool: false,
    });

    const caseReportsValidate = await query
      .orderBy('res.createdAt', 'DESC')
      .getMany();

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsValidate;
  }

  async summaryReportsMyCasesByCharacterization(
    filingNumber?: string,
    statusMovementId?: number,
    caseTypeId?: number,
    eventId?: number,
    priorityId?: number,
  ) {
    const query = this.caseReportValidateRepository
      .createQueryBuilder('crv')
      .innerJoinAndSelect('crv.reportResearcherAssignment', 'res')
      .leftJoinAndSelect('crv.caseType', 'caseType')
      .leftJoinAndSelect('crv.event', 'event')
      .leftJoinAndSelect('crv.priority', 'priority')
      .leftJoinAndSelect(
        'crv.reportAnalystAssignment',
        'reportAnalystAssignment',
      )
      .where('crv.val_cr_validated = :validated', { validated: false })
      .andWhere('crv.val_cr_status = :status', { status: true });

    if (filingNumber) {
      query.andWhere('crv.val_cr_filingnumber LIKE :filingNumber', {
        filingNumber: `%${filingNumber}%`,
      });
    }

    if (statusMovementId) {
      query.andWhere('crv.val_cr_statusmovement_id_fk = :statusMovementId', {
        statusMovementId,
      });
    }

    if (caseTypeId) {
      query.andWhere('crv.val_cr_casetype_id_fk = :caseTypeId', { caseTypeId });
    }

    if (eventId) {
      query.andWhere('crv.val_cr_event_id_fk = :eventId', { eventId });
    }

    if (priorityId) {
      query.andWhere('crv.val_cr_priority_id_fk = :priorityId', { priorityId });
    }

    query.andWhere('crv.val_cr_characterization_id_fk IS NOT NULL');

    query.andWhere('res.res_status = :statusBool', {
      statusBool: true,
    });

    query.andWhere('res.res_isreturned = :isReturnedBool', {
      isReturnedBool: false,
    });

    const caseReportsValidate = await query
      .orderBy('res.createdAt', 'DESC')
      .getMany();

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsValidate;
  }

  async findAssignedResearchByCaseId(caseId: string) {
    if (!caseId) {
      throw new HttpException(
        'El identificador del caso asignado es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const researchReporter =
      await this.reportResearcherAssignmentRepository.findOne({
        where: {
          res_validatedcase_id_fk: caseId,
          res_status: true,
          res_isreturned: false,
        },
      });

    if (!researchReporter) {
      throw new HttpException(
        'No se encontró el investigador',
        HttpStatus.NOT_FOUND,
      );
    }
    return researchReporter;
  }

  async reAssignResearcher(
    updateReportResearcherAssignmentDto: UpdateReportResearcherAssignmentDto,
    clientIp: string,
    idAnalyst: string,
  ) {
    if (!updateReportResearcherAssignmentDto) {
      throw new HttpException(
        'Los datos para actualizar la asignación del investigador son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idAnalyst) {
      throw new HttpException(
        'El identificador del analista es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!updateReportResearcherAssignmentDto.res_validatedcase_id_fk) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findCaseReportAssigned =
      await this.reportResearcherAssignmentRepository.findOne({
        where: {
          res_validatedcase_id_fk:
            updateReportResearcherAssignmentDto.res_validatedcase_id_fk,
          res_status: true,
          // res_isreturned: false,
        },
        withDeleted: true,
      });

    if (!findCaseReportAssigned) {
      throw new HttpException(
        'No se encontró el reporte asignado a investigador.',
        HttpStatus.NOT_FOUND,
      );
    }

    const findResearcherAssigned =
      await this.reportResearcherAssignmentRepository.findOne({
        where: {
          res_validatedcase_id_fk:
            updateReportResearcherAssignmentDto.res_validatedcase_id_fk,
          res_userresearch_id:
            updateReportResearcherAssignmentDto.res_userresearch_id,
          res_status: true,
          res_isreturned: false,
        },
      });

    if (findResearcherAssigned) {
      throw new HttpException(
        'El investigador seleccionado ya se encuentra asignado en este reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    const caseReportValidate = await this.caseReportValidateRepository.findOne({
      where: {
        id: updateReportResearcherAssignmentDto.res_validatedcase_id_fk,
        val_cr_validated: false,
        val_cr_status: true,
      },
      withDeleted: true,
    });

    if (!caseReportValidate) {
      throw new HttpException(
        'No se encontró el reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.REASSIGNMENT_RESEARCHER,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(`El movimiento no existe.`, HttpStatus.NOT_FOUND);
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      caseReportValidate.id,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
        val_cr_status: true,
        deletedAt: null,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const findObservationReturnCase =
      await this.observationReturnCaseRepository.findOne({
        where: {
          rec_o_validatedcase_id_fk: caseReportValidate.id,
          rec_o_status: true,
        },
      });

    if (findObservationReturnCase) {
      await this.observationReturnCaseRepository.delete({
        id: findObservationReturnCase.id,
      });
    }

    const result = await this.reportResearcherAssignmentRepository.update(
      findCaseReportAssigned.id,
      {
        ...updateReportResearcherAssignmentDto,
        res_useranalyst_id: idAnalyst,
        deletedAt: null,
        res_isreturned: false,
      },
    );

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo reasignar el analista`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.logService.createLog(
      updateReportResearcherAssignmentDto.res_validatedcase_id_fk,
      idAnalyst,
      clientIp,
      LogReportsEnum.LOG_REASSIGNMENT_RESEARCHER,
    );

    return new HttpException(
      `Investigador reasignado correctamente!`,
      HttpStatus.OK,
    );
  }

  async returnCaseToAnalyst(
    idCaseReportValidate: string,
    clientIp: string,
    idResearcher: string,
    userName: string,
    userEmail: string,
  ) {
    if (!idCaseReportValidate) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idResearcher) {
      throw new HttpException(
        'El identificador del investigador es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findReportResearcherAssigned =
      await this.reportResearcherAssignmentRepository.findOne({
        where: {
          res_validatedcase_id_fk: idCaseReportValidate,
          res_status: true,
          res_isreturned: false,
        },
      });

    if (!findReportResearcherAssigned) {
      throw new HttpException(
        'No se encontró el reporte asignado a investigador.',
        HttpStatus.NOT_FOUND,
      );
    }

    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk: idCaseReportValidate,
          ana_status: true,
          ana_isreturned: false,
        },
      });

    if (!reportAssignmentFind) {
      throw new HttpException(
        'No se encontró el reporte asignado a analista',
        HttpStatus.NOT_FOUND,
      );
    }

    const findCaseReportValidate =
      await this.caseReportValidateService.findOneReportValidate(
        idCaseReportValidate,
      );

    const updateStatusReturn =
      await this.reportResearcherAssignmentRepository.update(
        findReportResearcherAssigned.id,
        {
          res_isreturned: true,
        },
      );

    if (updateStatusReturn.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el estado de retorno.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const result = await this.reportResearcherAssignmentRepository.softDelete(
      findReportResearcherAssigned.id,
    );

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo anular el registro.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.RETURN_CASE_ANALYST,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(`El movimiento no existe.`, HttpStatus.NOT_FOUND);
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      idCaseReportValidate,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const userAnalystFind = await this.userService.getUserActiveByIdNumber(
      findReportResearcherAssigned.res_useranalyst_id,
    );

    const fullNameAnalyst = `${userAnalystFind.name} ${userAnalystFind.last_name}`;

    await this.logService.createLog(
      idCaseReportValidate,
      idResearcher,
      clientIp,
      LogReportsEnum.LOG_RETURN_CASE_ANALYST,
    );

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [userAnalystFind.principal_email];
    emailDetailsToSend.subject = SUBJECT_CASE_RETURNED_BY_RESEARCHER;
    emailDetailsToSend.emailTemplate = CASE_RETURNED_BY_RESEARCHER;
    emailDetailsToSend.fenixUrl = process.env.FENIX_URL;
    emailDetailsToSend.supportContactEmail = SUPPORT_CONTACT_EMAIL;
    emailDetailsToSend.userNameToEmail = fullNameAnalyst;
    emailDetailsToSend.caseFilingNumberToEmail =
      findCaseReportValidate.val_cr_filingnumber;
    emailDetailsToSend.generalContextToEmail = {
      userNameResearcher: userName,
      userEmailResearcher: userEmail,
    };

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return new HttpException(
      `¡Reporte devuelto a analista correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteAssignedResearcher(id: number) {
    const ResearcherFound =
      await this.reportAnalystAssignmentRepository.findOneBy({ id });

    if (!ResearcherFound) {
      throw new HttpException(
        `Investigador no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result =
      await this.reportResearcherAssignmentRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el investigador`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
