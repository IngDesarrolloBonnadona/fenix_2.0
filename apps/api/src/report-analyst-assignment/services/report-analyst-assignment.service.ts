import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateReportAnalystAssignmentDto } from '../dto/create-report-analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { SendEmailDto } from 'src/nodemailer/dto/send_email.dto';

import { ReportAnalystAssignment } from '../entities/report-analyst-assignment.entity';
import { CaseReportValidate } from 'src/case-report-validate/entities/case-report-validate.entity';
import { RoleResponseTime } from 'src/role-response-time/entities/role-response-time.entity';
import { RolePermission } from 'src/role-permission/entities/role-permission.entity';
import { CaseType } from 'src/case-type/entities/case-type.entity';
import { SeverityClasification } from 'src/severity-clasification/entities/severity-clasification.entity';
import { ReportResearcherAssignment } from 'src/report-researchers-assignment/entities/report-researchers-assignment.entity';
import { MovementReport } from 'src/movement-report/entities/movement-report.entity';
import { ObservationReturnCase } from 'src/observation-return-case/entities/observation-return-case.entity';
import { ObservationCancellationCase } from 'src/observation-cancellation-case/entities/observation-cancellation-case.entity';

import { LogReportsEnum } from 'src/utils/enums/logs.enum';
import { MovementReportEnum } from 'src/utils/enums/movement-report.enum';
import { UserRolesEnum } from 'src/utils/enums/user-roles.enum';
import { CaseTypeReportEnum } from 'src/utils/enums/caseType-report.enum';
import { SeverityClasificationEnum } from 'src/utils/enums/severity-clasif.enum';
import { SentinelTimeEnum } from 'src/utils/enums/sentinel-time.enum';
import {
  ANALYST_ASSIGNED,
  CASE_RETURNED_BY_ANALYST,
  SUBJECT_ANALYST_ASSIGNED,
  SUBJECT_CASE_RETURNED_BY_ANALYST,
} from 'src/nodemailer/constants/email_config.constant';
import { SUPPORT_CONTACT_EMAIL } from 'src/utils/constants/constants';

import { LogService } from 'src/log/services/log.service';
import { CaseReportValidateService } from 'src/case-report-validate/services/case-report-validate.service';
import { NodemailerService } from 'src/nodemailer/services/nodemailer.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ReportAnalystAssignmentService {
  constructor(
    @InjectRepository(ReportAnalystAssignment)
    private readonly reportAnalystAssignmentRepository: Repository<ReportAnalystAssignment>,
    @InjectRepository(CaseReportValidate)
    private readonly caseReportValidateRepository: Repository<CaseReportValidate>,
    @InjectRepository(RolePermission)
    private readonly roleRepository: Repository<RolePermission>,
    @InjectRepository(RoleResponseTime)
    private readonly roleResponseTimeRepository: Repository<RoleResponseTime>,
    @InjectRepository(CaseType)
    private readonly caseTypeRepository: Repository<CaseType>,
    @InjectRepository(SeverityClasification)
    private readonly severityClasificationRepository: Repository<SeverityClasification>,
    @InjectRepository(ReportResearcherAssignment)
    private readonly reportResearcherAssignmentRepository: Repository<ReportResearcherAssignment>,
    @InjectRepository(MovementReport)
    private readonly movementReportRepository: Repository<MovementReport>,
    @InjectRepository(ObservationReturnCase)
    private readonly observationReturnCaseRepository: Repository<ObservationReturnCase>,
    @InjectRepository(ObservationCancellationCase)
    private readonly observationCancellationCaseRepository: Repository<ObservationCancellationCase>,

    private readonly logService: LogService,
    private readonly nodemailerService: NodemailerService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => CaseReportValidateService))
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  async assignAnalyst(
    createReportAnalystAssignmentDto: CreateReportAnalystAssignmentDto,
    clientIp: string,
    idValidator: string,
    idNumberAnalyst: string,
    emailAnalyst: string,
    fullNameAnalist: string,
  ) {
    if (
      !createReportAnalystAssignmentDto ||
      !createReportAnalystAssignmentDto.ana_validatedcase_id_fk ||
      !createReportAnalystAssignmentDto.ana_positionname
    ) {
      throw new HttpException(
        'Algunos datos para asignar analistas son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idValidator) {
      throw new HttpException(
        'El identificador del validador es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk:
            createReportAnalystAssignmentDto.ana_validatedcase_id_fk,
          ana_status: true,
          ana_isreturned: false,
        },
      });

    if (reportAssignmentFind) {
      throw new HttpException(
        'El reporte ya tiene un analista asignado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const caseValidateFound =
      await this.caseReportValidateService.findOneReportValidate(
        createReportAnalystAssignmentDto.ana_validatedcase_id_fk,
      );

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.ASSIGNMENT_ANALYST,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(`El movimiento no existe.`, HttpStatus.NOT_FOUND);
    }

    const findIdRole = await this.roleRepository.findOne({
      where: {
        role_name: UserRolesEnum.ANALYST,
        role_status: true,
      },
    });

    if (!findIdRole) {
      throw new HttpException(
        `El rol ${UserRolesEnum.ANALYST} no existe.`,
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
        `El tiempo de respuesta del rol ${UserRolesEnum.ANALYST} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

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

    let responseTime = findRoleResponseTime.rest_r_responsetime;

    if (
      findCaseType.id === caseValidateFound.val_cr_casetype_id_fk &&
      findSeverityClasification.id ===
        caseValidateFound.val_cr_severityclasif_id_fk
    ) {
      responseTime = SentinelTimeEnum.SENTINEL_TIME;
    }

    const analyst = this.reportAnalystAssignmentRepository.create({
      ...createReportAnalystAssignmentDto,
      ana_uservalidator_id: idValidator,
      ana_useranalyst_id: idNumberAnalyst,
      ana_days: responseTime,
    });

    const assigned = await this.reportAnalystAssignmentRepository.save(analyst);

    await this.logService.createLog(
      assigned.ana_validatedcase_id_fk,
      idValidator,
      clientIp,
      LogReportsEnum.LOG_ASSIGNMENT_ANALYST,
    );

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      assigned.ana_validatedcase_id_fk,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el movimiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [emailAnalyst];
    emailDetailsToSend.userNameToEmail = fullNameAnalist;
    emailDetailsToSend.caseFilingNumberToEmail =
      caseValidateFound.val_cr_filingnumber;
    emailDetailsToSend.subject = SUBJECT_ANALYST_ASSIGNED;
    emailDetailsToSend.emailTemplate = ANALYST_ASSIGNED;
    emailDetailsToSend.fenixUrl = process.env.FENIX_URL;
    emailDetailsToSend.supportContactEmail = SUPPORT_CONTACT_EMAIL;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return new HttpException(
      `El caso #${caseValidateFound.val_cr_filingnumber} se asignó un analista`,
      HttpStatus.CREATED,
    );
  }

  async reAssignAnalyst(
    updateReportAnalystAssignmentDto: UpdateReportAnalystAssignmentDto,
    clientIp: string,
    idValidator: string,
  ) {
    if (!updateReportAnalystAssignmentDto) {
      throw new HttpException(
        'Los datos para reasignar analista son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idValidator) {
      throw new HttpException(
        'El identificador del validador es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk:
            updateReportAnalystAssignmentDto.ana_validatedcase_id_fk,
          ana_status: true,
          // ana_isreturned: false,
        },
        withDeleted: true,
      });

    if (!reportAssignmentFind) {
      throw new HttpException(
        'No se encontró el reporte asignado a analista',
        HttpStatus.NOT_FOUND,
      );
    }

    const caseReportValidate = await this.caseReportValidateRepository.findOne({
      where: {
        id: updateReportAnalystAssignmentDto.ana_validatedcase_id_fk,
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

    const result = await this.reportAnalystAssignmentRepository.update(
      reportAssignmentFind.id,
      {
        ...updateReportAnalystAssignmentDto,
        ana_uservalidator_id: idValidator,
        ana_amountreturns: 0,
        deletedAt: null,
        ana_isreturned: false,
      },
    );

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo reasignar el analista`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.REASSIGNMENT_ANALYST,
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

    const foundObservationReturnCase =
      await this.observationReturnCaseRepository.findOne({
        where: {
          rec_o_validatedcase_id_fk:
            updateReportAnalystAssignmentDto.ana_validatedcase_id_fk,
        },
      });

    if (foundObservationReturnCase) {
      await this.observationReturnCaseRepository.softDelete(
        foundObservationReturnCase.id,
      );
    }

    const foundObservationCancellationCase =
      await this.observationCancellationCaseRepository.findOne({
        where: {
          cac_o_validatedcase_id_fk:
            updateReportAnalystAssignmentDto.ana_validatedcase_id_fk,
        },
      });

    if (foundObservationCancellationCase) {
      await this.observationCancellationCaseRepository.softDelete(
        foundObservationCancellationCase.id,
      );
    }

    await this.logService.createLog(
      updateReportAnalystAssignmentDto.ana_validatedcase_id_fk,
      idValidator,
      clientIp,
      LogReportsEnum.LOG_REASSIGNMENT_ANALYST,
    );

    return new HttpException(
      `¡Analista reasignado correctamente!`,
      HttpStatus.OK,
    );
  }

  async returnCaseBetweenAnalyst(
    createReportAnalystAssignmentDto: CreateReportAnalystAssignmentDto,
    clientIp: string,
    idAnalystCurrent: string,
  ) {
    if (
      !createReportAnalystAssignmentDto ||
      !createReportAnalystAssignmentDto.ana_useranalyst_id ||
      !createReportAnalystAssignmentDto.ana_validatedcase_id_fk ||
      !createReportAnalystAssignmentDto.ana_positionname
    ) {
      throw new HttpException(
        'Algunos datos para asignar analistas son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idAnalystCurrent) {
      throw new HttpException(
        'El identificador del analista actual es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk:
            createReportAnalystAssignmentDto.ana_validatedcase_id_fk,
          ana_status: true,
          ana_isreturned: false,
        },
      });

    if (!reportAssignmentFind) {
      throw new HttpException(
        'No se encontró el caso asignado',
        HttpStatus.NOT_FOUND,
      );
    }

    if (reportAssignmentFind.ana_amountreturns === 2) {
      throw new HttpException(
        'No se pueden hacer más devoluciones para este caso.',
        HttpStatus.CONFLICT,
      );
    }

    const analystAssignedFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_useranalyst_id:
            createReportAnalystAssignmentDto.ana_useranalyst_id,
          ana_validatedcase_id_fk:
            createReportAnalystAssignmentDto.ana_validatedcase_id_fk,
          ana_positionname: createReportAnalystAssignmentDto.ana_positionname,
          ana_status: true,
          ana_isreturned: false,
        },
      });

    if (analystAssignedFind) {
      throw new HttpException(
        'El analista que intentas devolver el caso ya se encuentra asignado con ese reporte.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.caseReportValidateService.findOneReportValidate(
      createReportAnalystAssignmentDto.ana_validatedcase_id_fk,
    );

    reportAssignmentFind.ana_status = false;
    await this.reportAnalystAssignmentRepository.save(reportAssignmentFind);
    await this.reportAnalystAssignmentRepository.softDelete(
      reportAssignmentFind.id,
    );

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.RETURN_CASE_ANALYST,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(`El movimiento no existe.`, HttpStatus.NOT_FOUND);
    }

    const analyst = this.reportAnalystAssignmentRepository.create({
      ...createReportAnalystAssignmentDto,
      ana_uservalidator_id: reportAssignmentFind.ana_uservalidator_id,
      ana_days: reportAssignmentFind.ana_days,
      ana_amountreturns: (reportAssignmentFind.ana_amountreturns += 1),
    });

    const assigned = await this.reportAnalystAssignmentRepository.save(analyst);

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      assigned.ana_validatedcase_id_fk,
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

    await this.logService.createLog(
      assigned.ana_validatedcase_id_fk,
      idAnalystCurrent,
      clientIp,
      LogReportsEnum.LOG_RETURN_CASE_ANALYST,
    );

    return new HttpException(
      `El caso fue devuelto a otro analista correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async summaryReportsForAssignCases(idAnalyst: string) {
    if (!idAnalyst) {
      throw new HttpException(
        'El identificador del analista es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const VALIDATED = false;
    const ACTIVE_STATUS = true;
    const NOT_RETURNED = false;

    const query = this.caseReportValidateRepository
      .createQueryBuilder('crv')
      .innerJoinAndSelect('crv.reportAnalystAssignment', 'raa')
      .leftJoinAndSelect('crv.movementReport', 'movementReport')
      .leftJoinAndSelect('crv.caseType', 'caseType')
      .leftJoinAndSelect('crv.event', 'event')
      .leftJoinAndSelect('crv.priority', 'priority')
      .leftJoinAndSelect(
        'crv.reportResearcherAssignment',
        'reportResearcherAssignment',
      )
      .where('crv.val_cr_validated = :validated', { validated: VALIDATED })
      .andWhere('crv.val_cr_status = :status', { status: ACTIVE_STATUS })
      .andWhere('raa.ana_useranalyst_id = :idAnalyst', {
        idAnalyst,
      })
      .andWhere('raa.ana_status = :statusBool', {
        statusBool: ACTIVE_STATUS,
      })
      .andWhere('raa.ana_isreturned = :isReturnedBool', {
        isReturnedBool: NOT_RETURNED,
      })
      .orderBy('raa.createdAt', 'DESC');

    const caseReportsValidate = await query.getMany();

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsValidate;
  }

  async findAssignedAnalystByCaseId(caseId: string) {
    if (!caseId) {
      throw new HttpException(
        'El identificador del caso asignado es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const analystReporter =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk: caseId,
          ana_status: true,
          ana_isreturned: false,
        },
        relations: {
          caseReportValidate: true,
        },
      });

    if (!analystReporter) {
      throw new HttpException(
        'No se encontró el analista',
        HttpStatus.NOT_FOUND,
      );
    }
    return analystReporter;
  }

  async returnCaseToValidator(
    idCaseReportValidate: string,
    clientIp: string,
    idAnalyst: string,
    userName: string,
    userEmail: string,
  ) {
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

    if (!idCaseReportValidate) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findReportAnalystAssigned =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk: idCaseReportValidate,
          ana_status: true,
          ana_isreturned: false,
        },
      });

    if (!findReportAnalystAssigned) {
      throw new HttpException(
        'No se encontró el reporte asignado a analista.',
        HttpStatus.NOT_FOUND,
      );
    }

    const findCaseReportValidate =
      await this.caseReportValidateService.findOneReportValidate(
        idCaseReportValidate,
      );

    const updateStatusReturn =
      await this.reportAnalystAssignmentRepository.update(
        findReportAnalystAssigned.id,
        {
          ana_isreturned: true,
        },
      );

    if (updateStatusReturn.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el estado de retorno.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const result = await this.reportAnalystAssignmentRepository.softDelete(
      findReportAnalystAssigned.id,
    );

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo anular el registro.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const findResearcherAssigned =
      await this.reportResearcherAssignmentRepository.findOne({
        where: {
          res_validatedcase_id_fk: idCaseReportValidate,
          res_status: true,
          res_isreturned: false,
        },
      });

    if (findResearcherAssigned) {
      const result = await this.reportResearcherAssignmentRepository.softDelete(
        findResearcherAssigned.id,
      );

      if (result.affected === 0) {
        throw new HttpException(
          `No se pudo eliminar el investigador`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.RETURN_CASE_VALIDATOR,
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

    const userValidatorFind = await this.userService.getUserActiveByIdNumber(
      findReportAnalystAssigned.ana_uservalidator_id,
    );

    const fullNameValidator = `${userValidatorFind.name} ${userValidatorFind.last_name}`;

    await this.logService.createLog(
      idCaseReportValidate,
      idAnalyst,
      clientIp,
      LogReportsEnum.LOG_RETURN_CASE_VALIDATOR,
    );

    const emailDetailsToSend = new SendEmailDto();

    emailDetailsToSend.recipients = [userValidatorFind.principal_email];
    emailDetailsToSend.subject = SUBJECT_CASE_RETURNED_BY_ANALYST;
    emailDetailsToSend.emailTemplate = CASE_RETURNED_BY_ANALYST;
    emailDetailsToSend.fenixUrl = process.env.FENIX_URL;
    emailDetailsToSend.supportContactEmail = SUPPORT_CONTACT_EMAIL;
    emailDetailsToSend.userNameToEmail = fullNameValidator;
    emailDetailsToSend.caseFilingNumberToEmail =
      findCaseReportValidate.val_cr_filingnumber;
    emailDetailsToSend.generalContextToEmail = {
      userNameAnalyst: userName,
      userEmailAnalyst: userEmail,
    };

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return new HttpException(
      `¡Reporte devuelto a validador correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteAssignedAnalyst(id: number) {
    const analystReporterFound =
      await this.reportAnalystAssignmentRepository.findOneBy({ id });

    if (!analystReporterFound) {
      throw new HttpException(
        `Analista no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.reportAnalystAssignmentRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el analista asignado.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
