import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateMedicationFluidsResearchInstrumentDto } from 'src/medication-fluids-research-instrument/dto/create-medication-fluids-research-instrument.dto';
import { CreateVascularAccessResearchInstrumentDto } from 'src/vascular-access-research-instrument/dto/create-vascular-access-research-instrument.dto';
import { ResearchInstrumentEnum } from 'src/utils/enums/research-instrument.enum';

export class CreateClinicalResearchDto {
  @IsOptional()
  @IsBoolean()
  res_c_isComplete: boolean;

  @IsOptional()
  @IsNumber()
  res_c_research_instrument_id: number;

  @IsOptional()
  @IsString()
  rec_c_user_researcher_id: string;

  @IsOptional()
  @IsString()
  res_c_research_instrument_name: string;

  @IsOptional()
  @IsString()
  res_c_vascular_instrument_id: string;

  @IsOptional()
  @IsString()
  res_c_medication_fluid_instrument_id: string;

  @IsArray()
  @IsOptional()
  caseReportValidates: string[];

  @IsArray()
  @IsOptional()
  optionResearchCategories: number[];

  @IsOptional()
  @ValidateNested()
  @Type((obj) => {
    if (
      obj.object.res_c_research_instrument_name ===
      ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_VASCULAR_ACCESS
    ) {
      return CreateVascularAccessResearchInstrumentDto;
    } else if (
      obj.object.res_c_research_instrument_name ===
      ResearchInstrumentEnum.RESEARCH_INSTRUMENT_FOR_CASES_ASSOCIATED_WITH_MEDICATION_OR_FLUIDS
    ) {
      return CreateMedicationFluidsResearchInstrumentDto;
    }
    return Object;
  })
  instrumentData:
    | CreateVascularAccessResearchInstrumentDto
    | CreateMedicationFluidsResearchInstrumentDto;
}
