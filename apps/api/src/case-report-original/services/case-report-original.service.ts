import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CaseReportOriginal } from '../entities/case-report-original.entity';
import { CaseType } from 'src/case-type/entities/case-type.entity';
import { Priority } from 'src/priority/entities/priority.entity';
import { SeverityClasification } from 'src/severity-clasification/entities/severity-clasification.entity';
import { MovementReport } from 'src/movement-report/entities/movement-report.entity';

import { CaseReportValidateService } from 'src/case-report-validate/services/case-report-validate.service';
import { LogService } from 'src/log/services/log.service';
import { MedicineService } from 'src/medicine-case-report/services/medicine.service';
import { DeviceService } from 'src/device-case-report/services/device.service';
import { RiskTypeService } from 'src/risk-type/services/risk-type.service';
import { EventTypeService } from 'src/event-type/services/event-type.service';
import { ServiceService } from 'src/service/services/service.service';
import { EventService } from 'src/event/services/event.service';
import { SeverityClasificationService } from 'src/severity-clasification/services/severity-clasification.service';
import { OriginService } from 'src/origin/services/origin.service';
import { SubOriginService } from 'src/sub-origin/services/sub-origin.service';
import { RiskLevelService } from 'src/risk-level/services/risk-level.service';
import { NodemailerService } from 'src/nodemailer/services/nodemailer.service';

import { OriDtoValidator } from '../utils/helpers/ori-dto-validator.helper';
import { generateFilingNumber } from '../utils/helpers/generate_filing_number.helper';

import {
  REPORT_CREATED,
  SUBJECT_REPORT_CREATED,
} from 'src/nodemailer/constants/email_config.constant';
import { SUPPORT_CONTACT_EMAIL } from 'src/utils/constants/constants';

import { LogReportsEnum } from 'src/utils/enums/logs.enum';
import { MovementReportEnum } from 'src/utils/enums/movement-report.enum';
import { CaseTypeReportEnum } from 'src/utils/enums/caseType-report.enum';
import { SeverityClasificationEnum } from 'src/utils/enums/severity-clasif.enum';

import { CreateOriRiskReportDto } from '../dto/create-ori-risk-report.dto';
import { CreateOriAdverseEventReportDto } from '../dto/create-ori-adverse-event-report.dto';
import { CreateOriIncidentReportDto } from '../dto/create-ori-incident-report.dto';
import { CreateOriIndicatingUnsafeCareReportDto } from '../dto/create-ori-indicating-unsafe-care-report.dto';
import { CreateOriComplicationsReportDto } from '../dto/create-ori-complications-report.dto';
import { SendEmailDto } from 'src/nodemailer/dto/send_email.dto';

@Injectable()
export class CaseReportOriginalService {
  constructor(
    @InjectRepository(CaseReportOriginal)
    private readonly caseReportOriginalRepository: Repository<CaseReportOriginal>,
    @InjectRepository(CaseType)
    private readonly caseTypeRepository: Repository<CaseType>,

    private readonly caseReportValidateService: CaseReportValidateService,
    private readonly logService: LogService,
    private readonly medicineService: MedicineService,
    private readonly deviceService: DeviceService,
    private readonly riskTypeService: RiskTypeService,
    private readonly eventTypeService: EventTypeService,
    private readonly eventService: EventService,
    private readonly serviceService: ServiceService,
    private readonly severityClasificationService: SeverityClasificationService,
    private readonly originService: OriginService,
    private readonly subOriginService: SubOriginService,
    private readonly riskLevelService: RiskLevelService,
    private readonly nodemailerService: NodemailerService,
    private dataSource: DataSource,
  ) {}

  async createReportOriginal(
    createReportOriDto: any,
    clientIp: string,
    userName?: string,
    userEmail?: string,
  ) {
    await OriDtoValidator(createReportOriDto, this.caseTypeRepository);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all([
        this.eventTypeService.findOneEventType(
          createReportOriDto.ori_cr_eventtype_id_fk,
        ),
        this.eventService.findOneEvent(createReportOriDto.ori_cr_event_id_fk),
        this.serviceService.findOneService(
          createReportOriDto.ori_cr_originservice_id_fk,
        ),
        this.serviceService.findOneService(
          createReportOriDto.ori_cr_reportingservice_id_fk,
        ),
        this.originService.findOneOrigin(
          createReportOriDto.ori_cr_origin_id_fk,
        ),
        this.subOriginService.findOneSubOrigin(
          createReportOriDto.ori_cr_suborigin_id_fk,
        ),
        createReportOriDto.ori_cr_risktype_id_fk &&
          this.riskTypeService.findOneRiskType(
            createReportOriDto.ori_cr_risktype_id_fk,
          ),
        createReportOriDto.ori_cr_severityclasif_id_fk &&
          this.severityClasificationService.findOneSeverityClasification(
            createReportOriDto.ori_cr_severityclasif_id_fk,
          ),
        createReportOriDto.ori_cr_risklevel_id_fk &&
          this.riskLevelService.findOneRiskLevel(
            createReportOriDto.ori_cr_risklevel_id_fk,
          ),
      ]);

      const caseTypeFound = await this.caseTypeRepository.findOne({
        where: {
          id: createReportOriDto.ori_cr_casetype_id_fk,
        },
      });

      if (!caseTypeFound) {
        return new HttpException(
          'No se encontró el nombre del tipo de caso.',
          HttpStatus.NOT_FOUND,
        );
      }

      let caseReportOriginal: any;

      switch (caseTypeFound.cas_t_name) {
        case CaseTypeReportEnum.RISK:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportOriDto as CreateOriRiskReportDto,
          );
          break;
        case CaseTypeReportEnum.ADVERSE_EVENT:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportOriDto as CreateOriAdverseEventReportDto,
          );
          break;
        case CaseTypeReportEnum.INCIDENT:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportOriDto as CreateOriIncidentReportDto,
          );
          break;
        case CaseTypeReportEnum.INDICATING_UNSAFE_CARE:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportOriDto as CreateOriIndicatingUnsafeCareReportDto,
          );
          break;
        case CaseTypeReportEnum.COMPLICATIONS:
          caseReportOriginal = this.caseReportOriginalRepository.create(
            createReportOriDto as CreateOriComplicationsReportDto,
          );
          break;
        // agregar un tipo de caso nuevo
        default:
          throw new HttpException(
            'Tipo de caso no reconocido.',
            HttpStatus.BAD_REQUEST,
          );
      }

      const filingNumber = await generateFilingNumber(
        this.caseReportOriginalRepository,
      );

      const movementReportFound = await queryRunner.manager.findOne(
        MovementReport,
        {
          where: {
            mov_r_name: MovementReportEnum.REPORT_CREATION,
            mov_r_status: true,
          },
        },
      );

      if (!movementReportFound) {
        return new HttpException(
          `El movimiento no existe.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const severityClasificationFound = await queryRunner.manager.findOne(
        SeverityClasification,
        {
          where: { sev_c_name: SeverityClasificationEnum.MODERATE_SEVERITY },
        },
      );

      if (!severityClasificationFound) {
        throw new HttpException(
          `La clasificación de severidad no existe`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (
        createReportOriDto.ori_cr_severityclasif_id_fk === undefined ||
        createReportOriDto.ori_cr_severityclasif_id_fk === null
      ) {
        createReportOriDto.ori_cr_severityclasif_id_fk =
          severityClasificationFound.id;
      }

      const priorityFind = await queryRunner.manager.findOne(Priority, {
        where: {
          prior_severityclasif_id_fk:
            createReportOriDto.ori_cr_severityclasif_id_fk,
          prior_status: true,
        },
      });
      if (!priorityFind) {
        throw new HttpException(`La prioridad no existe`, HttpStatus.NOT_FOUND);
      }

      caseReportOriginal.ori_cr_severityclasif_id_fk =
        createReportOriDto.ori_cr_severityclasif_id_fk;
      caseReportOriginal.ori_cr_priority_id_fk = priorityFind.id;
      caseReportOriginal.ori_cr_filingnumber = filingNumber;
      caseReportOriginal.ori_cr_statusmovement_id_fk = movementReportFound.id;

      await queryRunner.manager.save(caseReportOriginal);

      const caseReportValidate =
        await this.caseReportValidateService.createReportValidateTransaction(
          queryRunner,
          caseReportOriginal,
          caseReportOriginal.id,
        );

      const hasMedicine =
        createReportOriDto.medicine && createReportOriDto.medicine.length > 0;

      if (hasMedicine) {
        await this.medicineService.createMedicineTransaction(
          createReportOriDto.medicine,
          caseReportOriginal.id,
          queryRunner,
        );
      }

      const hasDevice =
        createReportOriDto.device && createReportOriDto.device.length > 0;

      if (hasDevice) {
        await this.deviceService.createDeviceTransation(
          createReportOriDto.device,
          caseReportOriginal.id,
          queryRunner,
        );
      }

      await this.logService.createLogTransaction(
        queryRunner,
        caseReportValidate.id,
        caseReportOriginal.ori_cr_documentreporter,
        clientIp,
        LogReportsEnum.LOG_CREATION,
      );

      await queryRunner.commitTransaction();

      if (userEmail && userName) {
        const emailDetailsToSend = new SendEmailDto();

        emailDetailsToSend.recipients = [userEmail];
        emailDetailsToSend.userNameToEmail = userName;
        emailDetailsToSend.subject = SUBJECT_REPORT_CREATED;
        emailDetailsToSend.emailTemplate = REPORT_CREATED;
        emailDetailsToSend.fenixUrl = process.env.FENIX_URL;
        emailDetailsToSend.supportContactEmail = SUPPORT_CONTACT_EMAIL;

        await this.nodemailerService.sendEmail(emailDetailsToSend);
      }

      return new HttpException(
        `Tu reporte ha sido registrado exitosamente con el consecutivo #${caseReportOriginal.ori_cr_filingnumber}`,
        HttpStatus.CREATED,
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(
        `Un error a ocurrido: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAllReportsOriginal() {
    const caseReportsOriginal = await this.caseReportOriginalRepository.find({
      relations: {
        medicine: true,
        device: true,
        movementReport: true,
        caseType: true,
        riskType: true,
        severityClasification: true,
        origin: true,
        subOrigin: true,
        riskLevel: true,
        event: true,
        eventType: true,
        originService: true,
        reportingService: true,
        priority: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (caseReportsOriginal.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsOriginal;
  }

  async findOneReportOriginal(id: string) {
    if (!id) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const caseReportsOriginal = await this.caseReportOriginalRepository.findOne(
      {
        where: { id },
        relations: {
          medicine: true,
          device: true,
          movementReport: true,
          caseType: true,
          riskType: true,
          priority: true,
          severityClasification: true,
          origin: true,
          subOrigin: true,
          riskLevel: true,
          event: true,
          eventType: true,
          originService: true,
          reportingService: true,
        },
      },
    );

    if (!caseReportsOriginal) {
      throw new HttpException(
        `No se encontró el reporte.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsOriginal;
  }
}
