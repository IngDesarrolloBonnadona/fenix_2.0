import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { CreateClinicalResearchDto } from '../dto/create-clinical-research.dto';

import { ClinicalResearch } from '../entities/clinical-research.entity';
import { CaseReportValidate } from 'src/case-report-validate/entities/case-report-validate.entity';
import { VascularAccessResearchInstrument } from 'src/vascular-access-research-instrument/entities/vascular-access-research-instrument.entity';
import { OptionResearchCategory } from 'src/option_research_category/entities/option_research_category.entity';
import { ResearchInstrument } from 'src/research-instrument/entities/research-instrument.entity';
import { MedicationFluidsResearchInstrument } from 'src/medication-fluids-research-instrument/entities/medication-fluids-research-instrument.entity';

import { handleResearchInstrument } from '../utils/helpers/instrument-handler.helper';
import { getExistingInstrument } from '../utils/helpers/get-existing-instrument.helper';
import { assignInverseRelationAssociatedInstrument } from '../utils/helpers/assign-inverse-relation-associated-instrument.helper';
import { LogService } from 'src/log/services/log.service';
import { LogReportsEnum } from 'src/utils/enums/logs.enum';
import { MovementReportEnum } from 'src/utils/enums/movement-report.enum';
import { MovementReport } from 'src/movement-report/entities/movement-report.entity';

@Injectable()
export class ClinicalResearchService {
  constructor(
    @InjectRepository(ClinicalResearch)
    private readonly clinicalResearchRepository: Repository<ClinicalResearch>,

    @InjectRepository(CaseReportValidate)
    private readonly caseReportValidateRepository: Repository<CaseReportValidate>,

    @InjectRepository(VascularAccessResearchInstrument)
    private readonly vascularAccessResearchInstrumentRepository: Repository<VascularAccessResearchInstrument>,

    @InjectRepository(MedicationFluidsResearchInstrument)
    private readonly medicationFluidsResearchInstrumentRepository: Repository<MedicationFluidsResearchInstrument>,

    @InjectRepository(OptionResearchCategory)
    private readonly optionResearchCategoryRepository: Repository<OptionResearchCategory>,

    @InjectRepository(ResearchInstrument)
    private readonly researchInstrumentRepository: Repository<ResearchInstrument>,

    @InjectRepository(MovementReport)
    private readonly movementReportRepository: Repository<MovementReport>,

    private readonly logService: LogService,
  ) {}

  async saveClinicalResearch(
    createClinicalResearchDto: CreateClinicalResearchDto,
    clientIp: string,
    clinicalResearchId?: string,
  ) {
    const {
      caseReportValidates: reports_ids,
      optionResearchCategories: option_category_ids,
      instrumentData: research_instrument_data,
      ...clinicalResearchData
    } = createClinicalResearchDto;

    const caseReportValidatesFound =
      await this.caseReportValidateRepository.findBy({
        id: In(reports_ids),
        val_cr_validated: false,
      });

    if (caseReportValidatesFound.length !== reports_ids.length) {
      throw new HttpException(
        'Uno o más casos no existen.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clinicalResearchId) {
      const existingCaseClinicalResearch = await this.clinicalResearchRepository
        .createQueryBuilder('clinicalResearch')
        .leftJoinAndSelect(
          'clinicalResearch.caseReportValidate',
          'caseReportValidate',
        )
        .where('caseReportValidate.id IN (:...reports_ids)', { reports_ids })
        .getMany();

      if (existingCaseClinicalResearch.length > 0) {
        throw new HttpException(
          'Uno o más casos ya están asociados a una investigación clínica.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const optionResearchCategoriesFound =
      await this.optionResearchCategoryRepository.findBy({
        id: In(option_category_ids),
      });

    if (optionResearchCategoriesFound.length !== option_category_ids.length) {
      throw new HttpException(
        'Una o más opciones de categorías de investigación no existen.',
        HttpStatus.NOT_FOUND,
      );
    }

    const researchInstrumentFound =
      await this.researchInstrumentRepository.findOne({
        where: {
          id: clinicalResearchData.res_c_research_instrument_id,
          inst_r_status: true,
        },
      });

    if (!researchInstrumentFound) {
      return new HttpException(
        'No se encontró el nombre del instrumento de investigación.',
        HttpStatus.NOT_FOUND,
      );
    }

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.CASE_UNDER_INVESTIGATION,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      return new HttpException(
        `El movimiento no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    let clinicalResearch: ClinicalResearch;

    if (clinicalResearchId) {
      // Actualizar investigación clínica existente
      clinicalResearch = await this.clinicalResearchRepository.findOne({
        where: { id: clinicalResearchId, res_c_status: true },
        relations: {
          vascularAccessResearchInstrument: true,
          medicationFluidsResearchInstrument: true,
        },
      });

      if (!clinicalResearch) {
        throw new HttpException(
          'No se encontró la investigación clínica.',
          HttpStatus.NOT_FOUND,
        );
      }

      // Obtener el instrumento existente
      const existingInstrument = await getExistingInstrument(
        researchInstrumentFound.inst_r_name,
        clinicalResearch,
      );

      //Manipular el instrumento correspondiente
      const associatedInstrument = await handleResearchInstrument(
        researchInstrumentFound.inst_r_name,
        research_instrument_data,
        clinicalResearchData,
        optionResearchCategoriesFound,
        this.vascularAccessResearchInstrumentRepository,
        this.medicationFluidsResearchInstrumentRepository,
        existingInstrument,
      );

      // Guardar los cambios en la investigación clínica
      const savedClinicalResearch =
        await this.clinicalResearchRepository.save(clinicalResearch);

      await assignInverseRelationAssociatedInstrument(
        researchInstrumentFound.inst_r_name,
        associatedInstrument,
        savedClinicalResearch,
        this.vascularAccessResearchInstrumentRepository,
        this.medicationFluidsResearchInstrumentRepository,
      );

      return savedClinicalResearch;
    } else {
      const associatedInstrument = await handleResearchInstrument(
        researchInstrumentFound.inst_r_name,
        research_instrument_data,
        clinicalResearchData,
        optionResearchCategoriesFound,
        this.vascularAccessResearchInstrumentRepository,
        this.medicationFluidsResearchInstrumentRepository,
      );

      const clinicalResearchCreate = this.clinicalResearchRepository.create({
        ...clinicalResearchData,
        caseReportValidate: caseReportValidatesFound,
      });

      const savedClinicalResearch = await this.clinicalResearchRepository.save(
        clinicalResearchCreate,
      );

      await assignInverseRelationAssociatedInstrument(
        researchInstrumentFound.inst_r_name,
        associatedInstrument,
        savedClinicalResearch,
        this.vascularAccessResearchInstrumentRepository,
        this.medicationFluidsResearchInstrumentRepository,
      );

      const updateStatusMovement =
        await this.caseReportValidateRepository.update(
          createClinicalResearchDto.caseReportValidates,
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

      // createClinicalResearchDto.caseReportValidates.forEach((item) => {
      //   this.logService.createLog(
      //     item,
      //     createClinicalResearchDto.rec_c_user_researcher_id,
      //     clientIp,
      //     LogReportsEnum.LOG_INVESTIGATION_BEGAN,
      //   );
      // });

      return savedClinicalResearch;
    }
  }

  async findAllClinicalResearchs() {
    const clinicalResearchs = await this.clinicalResearchRepository.find({
      where: { res_c_status: true },
    });

    if (clinicalResearchs.length === 0) {
      throw new HttpException(
        'No se encontró la lista de investigaciones clínicas.',
        HttpStatus.NOT_FOUND,
      );
    }

    return clinicalResearchs;
  }

  async findOneClinicalResearch(id: string) {
    if (!id) {
      throw new HttpException(
        'El identificador de la investigación clínica es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const clinicalResearch = await this.clinicalResearchRepository.findOne({
      where: { id, res_c_status: true },
      relations: {
        vascularAccessResearchInstrument: true,
        medicationFluidsResearchInstrument: true,
      },
    });

    if (!clinicalResearch) {
      throw new HttpException(
        'No se encontró la investigación clínica.',
        HttpStatus.NOT_FOUND,
      );
    }

    return clinicalResearch;
  }

  // update(id: string, updateClinicalResearchDto: UpdateClinicalResearchDto) {
  //   return `This action updates a #${id} clinicalResearch`;
  // }

  async deleteClinicalResearch(id: string) {
    const clinicalResearch = await this.findOneClinicalResearch(id);
    const result = await this.clinicalResearchRepository.softDelete(
      clinicalResearch.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la investigación clínica.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
