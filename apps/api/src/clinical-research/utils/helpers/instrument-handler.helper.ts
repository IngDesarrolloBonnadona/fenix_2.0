import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ResearchInstrumentEnum } from 'src/utils/enums/research-instrument.enum';
import { VascularAccessResearchInstrument } from 'src/vascular-access-research-instrument/entities/vascular-access-research-instrument.entity';
import { MedicationFluidsResearchInstrument } from 'src/medication-fluids-research-instrument/entities/medication-fluids-research-instrument.entity';
import { OptionResearchCategory } from 'src/option_research_category/entities/option_research_category.entity';

export async function handleResearchInstrument(
  researchInstrumentName: string,
  research_instrument_data: any,
  clinicalResearchData: any,
  optionResearchCategoriesFound: OptionResearchCategory[],
  vascularAccessResearchInstrumentRepository: Repository<VascularAccessResearchInstrument>,
  medicationFluidsResearchInstrumentRepository: Repository<MedicationFluidsResearchInstrument>,
  existingInstrument?: any,
) {
  let associatedInstrument: any;

  switch (researchInstrumentName) {
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_VASCULAR_ACCESS:
      if (existingInstrument) {
        // Actualizar el instrumento existente
        associatedInstrument =
          await vascularAccessResearchInstrumentRepository.save({
            ...existingInstrument,
            ...research_instrument_data,
            optionResearchCategory: optionResearchCategoriesFound,
          });
      } else {
        // Crear un nuevo instrumento
        const vascularInstrument =
          vascularAccessResearchInstrumentRepository.create({
            ...research_instrument_data,
            optionResearchCategory: optionResearchCategoriesFound,
          });

        associatedInstrument =
          await vascularAccessResearchInstrumentRepository.save(
            vascularInstrument,
          );
      }

      clinicalResearchData.res_c_vascular_instrument_id =
        associatedInstrument.id;

      console.log(
        'se guardó en: ',
        ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_VASCULAR_ACCESS,
      );
      break;
    case ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_MEDICATION_OR_FLUIDS:
      if (existingInstrument) {
        // Actualizar el instrumento existente
        associatedInstrument =
          await medicationFluidsResearchInstrumentRepository.save({
            ...existingInstrument,
            ...research_instrument_data,
            optionResearchCategory: optionResearchCategoriesFound,
          });
      } else {
        const medicationInstrument =
          medicationFluidsResearchInstrumentRepository.create({
            ...research_instrument_data,
            optionResearchCategory: optionResearchCategoriesFound,
          });

        associatedInstrument =
          await medicationFluidsResearchInstrumentRepository.save(
            medicationInstrument,
          );
      }

      clinicalResearchData.res_c_medication_fluid_instrument_id =
        associatedInstrument.id;

      console.log(
        'se guardó en: ',
        ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_MEDICATION_OR_FLUIDS,
      );
      break;
    default:
      throw new HttpException(
        'Tipo de caso no reconocido.',
        HttpStatus.BAD_REQUEST,
      );
  }

  return associatedInstrument;
}
