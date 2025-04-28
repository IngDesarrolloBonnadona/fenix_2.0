import { plainToInstance } from 'class-transformer';
import { CreateOriAdverseEventReportDto } from '../../dto/create-ori-adverse-event-report.dto';
import { CreateOriComplicationsReportDto } from '../../dto/create-ori-complications-report.dto';
import { CreateOriIncidentReportDto } from '../../dto/create-ori-incident-report.dto';
import { CreateOriIndicatingUnsafeCareReportDto } from '../../dto/create-ori-indicating-unsafe-care-report.dto';
import { CreateOriRiskReportDto } from '../../dto/create-ori-risk-report.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CaseType } from 'src/case-type/entities/case-type.entity';
import { CaseTypeReportEnum } from 'src/utils/enums/caseType-report.enum';

export type CreateReportOriDto = //Discriminador que define los Dto

    | CreateOriAdverseEventReportDto
    | CreateOriComplicationsReportDto
    | CreateOriIncidentReportDto
    | CreateOriIndicatingUnsafeCareReportDto
    | CreateOriRiskReportDto;

export async function OriDtoValidator(
  createReportDto: any,
  caseTypeRepository: Repository<CaseType>,
) {
  let dtoInstance: CreateReportOriDto;

  const caseTypeFound = await caseTypeRepository.findOne({
    where: {
      id: createReportDto.ori_cr_casetype_id_fk,
    },
  });

  if (!caseTypeFound) {
    throw new HttpException(`El tipo de caso no existe.`, HttpStatus.NOT_FOUND);
  }

  switch (caseTypeFound.cas_t_name) {
    case CaseTypeReportEnum.RISK:
      dtoInstance = plainToInstance(CreateOriRiskReportDto, createReportDto);
      break;
    case CaseTypeReportEnum.ADVERSE_EVENT:
      dtoInstance = plainToInstance(
        CreateOriAdverseEventReportDto,
        createReportDto,
      );
      break;
    case CaseTypeReportEnum.INCIDENT:
      dtoInstance = plainToInstance(
        CreateOriIncidentReportDto,
        createReportDto,
      );
      break;
    case CaseTypeReportEnum.INDICATING_UNSAFE_CARE:
      dtoInstance = plainToInstance(
        CreateOriIndicatingUnsafeCareReportDto,
        createReportDto,
      );
      break;
    case CaseTypeReportEnum.COMPLICATIONS:
      dtoInstance = plainToInstance(
        CreateOriComplicationsReportDto,
        createReportDto,
      );
      break;
    default:
      throw new HttpException(
        'Tipo de caso no reconocido.',
        HttpStatus.BAD_REQUEST,
      );
  }

  const errors = await validate(dtoInstance);

  if (errors.length > 0) {
    throw new HttpException(
      `Validación fallida: ${errors.map((error) => error.toString()).join(', ')}`,
      HttpStatus.BAD_REQUEST,
    );
  }

  return dtoInstance;
}
