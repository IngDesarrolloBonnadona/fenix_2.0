import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as dayjs from 'dayjs';

import { Synergy } from '../entities/synergy.entity';
import { CaseType } from 'src/case-type/entities/case-type.entity';
import { CaseReportValidate } from 'src/case-report-validate/entities/case-report-validate.entity';
import { MovementReport } from 'src/movement-report/entities/movement-report.entity';

import { LogService } from 'src/log/services/log.service';
import { NodemailerService } from 'src/nodemailer/services/nodemailer.service';

import { CaseTypeReportEnum } from 'src/utils/enums/caseType-report.enum';
import { LogReportsEnum } from 'src/utils/enums/logs.enum';
import { MovementReportEnum } from 'src/utils/enums/movement-report.enum';
import { SUPPORT_CONTACT_EMAIL } from 'src/utils/constants/constants';

import { CreateSynergyDto } from '../dto/create-synergy.dto';
import { UpdateSynergyDto } from '../dto/update-synergy.dto';
import { SendEmailDto } from 'src/nodemailer/dto/send_email.dto';

import {
  CASE_ELEVATED_SYNERGY,
  SUBJECT_CASE_ELEVATED_SYNERGY,
} from 'src/nodemailer/constants/email_config.constant';

@Injectable()
export class SynergyService {
  constructor(
    @InjectRepository(Synergy)
    private readonly synergyRepository: Repository<Synergy>,
    @InjectRepository(CaseType)
    private readonly caseTypeRepository: Repository<CaseType>,
    @InjectRepository(CaseReportValidate)
    private readonly caseReportValidateRepository: Repository<CaseReportValidate>,
    @InjectRepository(MovementReport)
    private readonly movementReportRepository: Repository<MovementReport>,

    private readonly logService: LogService,
    private readonly nodemailerService: NodemailerService,
  ) {}

  async createSynergy(
    createSynergy: CreateSynergyDto,
    clientIp: string,
    idValidator: string,
    emailAnalyst: string,
    fullNameAnalist: string,
  ) {
    const adverseEventTypeFound = await this.caseTypeRepository.findOne({
      where: {
        cas_t_name: CaseTypeReportEnum.ADVERSE_EVENT,
      },
    });

    if (!adverseEventTypeFound) {
      throw new HttpException(
        `Tipo de caso ${CaseTypeReportEnum.ADVERSE_EVENT} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    const existingCaseValidate =
      await this.caseReportValidateRepository.findOne({
        where: {
          id: createSynergy.syn_validatedcase_id_fk,
          val_cr_validated: false,
        },
      });

    if (!existingCaseValidate) {
      throw new HttpException(
        'No se encontró el caso para escalar a sinergia',
        HttpStatus.NOT_FOUND,
      );
    }

    const existingSynergies = await this.synergyRepository.findOne({
      where: {
        syn_validatedcase_id_fk: createSynergy.syn_validatedcase_id_fk,
      },
    });

    if (existingSynergies) {
      throw new HttpException(
        'El caso ya fue elevado a comité de sinergia',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.CASE_RAISED_SYNERGY_COMMITTEE,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(`El movimiento no existe.`, HttpStatus.NOT_FOUND);
    }

    if (
      existingCaseValidate.val_cr_casetype_id_fk !== adverseEventTypeFound.id
    ) {
      throw new HttpException(
        `El caso #${existingCaseValidate.val_cr_filingnumber} no coincide con el tipo de caso ${CaseTypeReportEnum.ADVERSE_EVENT}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newSynergy = this.synergyRepository.create({
      ...createSynergy,
      syn_evaluationdate: dayjs().format('YYYY-MM-DD'),
    });

    await this.synergyRepository.save(newSynergy);

    await this.logService.createLog(
      createSynergy.syn_validatedcase_id_fk,
      idValidator,
      clientIp,
      LogReportsEnum.LOG_CASE_RAISED_SYNERGY_COMMITTEE,
    );

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      createSynergy.syn_validatedcase_id_fk,
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
      existingCaseValidate.val_cr_filingnumber;
    emailDetailsToSend.subject = SUBJECT_CASE_ELEVATED_SYNERGY;
    emailDetailsToSend.emailTemplate = CASE_ELEVATED_SYNERGY;
    emailDetailsToSend.fenixUrl = process.env.FENIX_URL;
    emailDetailsToSend.supportContactEmail = SUPPORT_CONTACT_EMAIL;

    await this.nodemailerService.sendEmail(emailDetailsToSend);

    return new HttpException(
      `se elevó a sinergia correctamente`,
      HttpStatus.CREATED,
    );
  }

  async findAllSynergy() {
    const synergies = await this.synergyRepository.find({
      relations: {
        caseReportValidate: true,
      },
      // where: {
      //   syn_status: false,
      // },
      order: {
        createdAt: 'DESC',
      },
    });

    if (synergies.length === 0) {
      throw new HttpException(
        'No se encontró la lista de casos en sinergia',
        HttpStatus.NOT_FOUND,
      );
    }

    const result = [];
    synergies.map((item) => {
      result.push({
        id: item.id,
        syn_validatedcase_id_fk: item.syn_validatedcase_id_fk,
        syn_observations: item.syn_observations,
        syn_analystidnumber: item.syn_analystidnumber,
        syn_evaluationdate: item.syn_evaluationdate,
        syn_resolutiondate: item.syn_resolutiondate,
        syn_patientcontent: item.syn_patientcontent,
        syn_possiblefaults: item.syn_possiblefaults,
        syn_consequences: item.syn_consequences,
        syn_clinicalmanagement: item.syn_clinicalmanagement,
        syn_whomwasnotified: item.syn_whomwasnotified,
        syn_status: item.syn_status,
        val_cr_filingnumber: item.caseReportValidate?.val_cr_filingnumber,
        val_cr_documentpatient: item.caseReportValidate?.val_cr_documentpatient,
        val_cr_doctypepatient: item.caseReportValidate?.val_cr_doctypepatient,
        val_cr_firstnamepatient:
          item.caseReportValidate?.val_cr_firstnamepatient,
        val_cr_secondnamepatient:
          item.caseReportValidate?.val_cr_secondnamepatient,
        val_cr_firstlastnamepatient:
          item.caseReportValidate?.val_cr_firstlastnamepatient,
        val_cr_secondlastnamepatient:
          item.caseReportValidate?.val_cr_secondlastnamepatient,
        val_cr_agepatient: item.caseReportValidate?.val_cr_agepatient,
        val_cr_genderpatient: item.caseReportValidate?.val_cr_genderpatient,
        val_cr_epspatient: item.caseReportValidate?.val_cr_epspatient,
        val_cr_description: item.caseReportValidate?.val_cr_description,
      });
    });

    return result;
  }

  async findOneSynergy(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del caso en sinergia es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const synergy = await this.synergyRepository.findOne({
      where: { id },
      relations: {
        caseReportValidate: true,
      },
    });

    if (!synergy) {
      throw new HttpException(
        'No se encontró el caso en sinergia',
        HttpStatus.NOT_FOUND,
      );
    }

    return synergy;
  }

  async resolutionSynergy(
    id: number,
    clientIp: string,
    idValidator: string,
    resolutionSynergyDto: UpdateSynergyDto,
  ) {
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

    const synergy = await this.findOneSynergy(id);

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.SOLUTION_CASE_SYNERGY,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      throw new HttpException(`El movimiento no existe.`, HttpStatus.NOT_FOUND);
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      synergy.syn_validatedcase_id_fk,
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

    const resolutionSynergy = await this.synergyRepository.update(synergy.id, {
      syn_analystidnumber: resolutionSynergyDto.syn_analystidnumber,
      syn_patientcontent: resolutionSynergyDto.syn_patientcontent,
      syn_possiblefaults: resolutionSynergyDto.syn_possiblefaults,
      syn_consequences: resolutionSynergyDto.syn_consequences,
      syn_clinicalmanagement: resolutionSynergyDto.syn_clinicalmanagement,
      syn_whomwasnotified: resolutionSynergyDto.syn_whomwasnotified,

      syn_resolutiondate: dayjs().format('YYYY-MM-DD'),
      syn_status: true,
    });

    if (resolutionSynergy.affected === 0) {
      throw new HttpException(
        `No se pudo resolver el caso.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.logService.createLog(
      synergy.syn_validatedcase_id_fk,
      idValidator,
      clientIp,
      LogReportsEnum.LOG_SOLUTION_CASE_SYNERGY,
    );

    return new HttpException(
      `¡Caso resuelto y registrado correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async deleteSynergy(id: number) {
    const synergyFound = await this.synergyRepository.findOneBy({ id });

    if (!synergyFound) {
      throw new HttpException(
        `Sinergia no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.synergyRepository.softDelete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `No se pudo eliminar el reporte en sinergia.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
