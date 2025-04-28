import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateControlEvaluationDto } from '../dto/create-control-evaluation.dto';
import { UpdateControlEvaluationDto } from '../dto/update-control-evaluation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ControlEvaluation } from '../entities/control-evaluation.entity';
import { Between, Repository } from 'typeorm';
import { Event } from 'src/event/entities/event.entity';
import { ProbabilityOcurrence } from 'src/probability-ocurrence/entities/probability-ocurrence.entity';
import { Impact } from 'src/impact/entities/impact.entity';
import { QuarterYear } from 'src/quarter-year/entities/quarter-year.entity';

@Injectable()
export class ControlEvaluationService {
  constructor(
    @InjectRepository(ControlEvaluation)
    private readonly controlEvaluationRepository: Repository<ControlEvaluation>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(ProbabilityOcurrence)
    private readonly probabilityOcurrenceRepository: Repository<ProbabilityOcurrence>,
    @InjectRepository(Impact)
    private readonly impactRepository: Repository<Impact>,
    @InjectRepository(QuarterYear)
    private readonly quarterYearRepository: Repository<QuarterYear>,
  ) {}

  async createControlEvaluation(
    createControlEvaluationDto: CreateControlEvaluationDto,
  ) {
    const { con_e_event_id, con_e_year, con_e_is_inherent } =
      createControlEvaluationDto;

    const [findEvent, findControlEvaluationInherent] = await Promise.all([
      this.eventRepository.findOne({
        where: {
          id: con_e_event_id,
          eve_status: true,
        },
      }),

      this.controlEvaluationRepository.findOne({
        where: {
          con_e_event_id: con_e_event_id,
          con_e_year: con_e_year,
          con_e_is_inherent: true,
        },
      }),
    ]);

    if (!findEvent) {
      throw new HttpException(`Riesgo no encontrado.`, HttpStatus.NOT_FOUND);
    }

    if (!findControlEvaluationInherent) {
      if (con_e_is_inherent) {
        return await this.controlEvaluationRepository.save(
          this.controlEvaluationRepository.create(createControlEvaluationDto),
        );
      } else {
        throw new HttpException(
          `El inherente no fue encontrado, por favor vuelve a iniciar la evaluación nuevamente.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (!con_e_is_inherent) {
      const [findImpact, findProbabilityOcurrence, findquarterYear] =
        await Promise.all([
          this.impactRepository.findOne({
            where: {
              id: createControlEvaluationDto.con_e_impact_id,
              imp_status: true,
            },
          }),

          this.probabilityOcurrenceRepository.findOne({
            where: {
              id: createControlEvaluationDto.con_e_probability_ocurrence_id,
              prob_o_status: true,
            },
          }),

          this.quarterYearRepository.findOne({
            where: {
              id: createControlEvaluationDto.con_e_quarter_year_id,
              qua_status: true,
            },
          }),
        ]);

      if (!findImpact) {
        throw new HttpException(`Impacto no encontrado.`, HttpStatus.NOT_FOUND);
      }

      if (!findProbabilityOcurrence) {
        throw new HttpException(
          `Probabilidad de ocurrencia no encontrada.`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (!findquarterYear) {
        throw new HttpException(
          `Trimestre no encontrado.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const savedControlEvaluationResidual =
        await this.controlEvaluationRepository.save(
          this.controlEvaluationRepository.create(createControlEvaluationDto),
        );

      const findControlEvaluationInherentNextYear =
        await this.controlEvaluationRepository.findOne({
          where: {
            con_e_event_id: con_e_event_id,
            con_e_year: con_e_year + 1,
            con_e_is_inherent: true,
          },
        });

      if (!findControlEvaluationInherentNextYear) {
        if (findquarterYear.qua_number === 4) {
          await this.controlEvaluationRepository.save(
            this.controlEvaluationRepository.create({
              con_e_event_id,
              con_e_materialized_case:
                savedControlEvaluationResidual.con_e_materialized_case,
              con_e_year: savedControlEvaluationResidual.con_e_year + 1,
              con_e_is_inherent: true,
            }),
          );
        }
      }

      return savedControlEvaluationResidual;
    }
    return null;
  }

  async findAllControlsEvaluation() {
    const controlEvaluation = await this.controlEvaluationRepository.find({
      where: {
        con_e_status: true,
      },
      relations: {
        impact: true,
        event: true,
        probabilityOcurrence: true,
        quarterYear: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (controlEvaluation.length === 0) {
      throw new HttpException(
        'No se encontró la lista de Controles de evaluacion.',
        HttpStatus.NOT_FOUND,
      );
    }
    return controlEvaluation;
  }

  async findControlsEvaluationByEventAndYear(eventId: number, year: number) {
    const controlEvaluation = await this.controlEvaluationRepository.find({
      where: {
        con_e_event_id: eventId,
        con_e_year: year,
      },
      relations: {
        impact: true,
        event: true,
        probabilityOcurrence: true,
        quarterYear: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (controlEvaluation.length === 0) {
      return [];
    } else {
      return controlEvaluation;
    }
  }

  async findControlsEvaluationByDate(startDate: string, endDate: string) {
    const controlEvaluation = await this.controlEvaluationRepository
      .createQueryBuilder('controlEvaluation')
      .where(
        'CAST(controlEvaluation.createdAt AS DATE) BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      )
      .andWhere('controlEvaluation.con_e_is_inherent = false')
      .leftJoinAndSelect('controlEvaluation.impact', 'impact')
      .leftJoinAndSelect(
        'controlEvaluation.probabilityOcurrence',
        'probabilityOcurrence',
      )
      .leftJoinAndSelect('controlEvaluation.quarterYear', 'quarterYear')
      .leftJoinAndSelect('controlEvaluation.event', 'event')
      .leftJoinAndSelect('event.unit', 'unit')
      .leftJoinAndSelect('event.riskType', 'riskType')
      .leftJoinAndSelect(
        'event.materializedAdverseEvent',
        'materializedAdverseEvent',
      )
      .leftJoinAndSelect(
        'materializedAdverseEvent.caseReportValidate',
        'caseReportValidateAdverse',
      )
      .leftJoinAndSelect('event.materializedIncident', 'materializedIncident')
      .leftJoinAndSelect(
        'materializedIncident.caseReportValidate',
        'caseReportValidateIncident',
      )
      .getMany();

    return controlEvaluation.length > 0 ? controlEvaluation : [];
  }
}
