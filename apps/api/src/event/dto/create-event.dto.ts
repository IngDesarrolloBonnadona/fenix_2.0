import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateEventDto {
  @IsNumber()
  @IsNotEmpty()
  eve_eventtype_id_fk: number;

  @IsNumber()
  @IsOptional()
  eve_unit_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  eve_oncologycategory_id_fk: number;

  @IsNumber()
  @IsOptional()
  eve_characterizationcase_id_fk: number;

  @IsNumber()
  @IsOptional()
  eve_materialized_adverse_event_id: number;

  @IsNumber()
  @IsOptional()
  eve_materialized_incident_id: number;

  @IsNumber()
  @IsOptional()
  eve_risk_type_id: number;

  @IsNotEmpty()
  @IsString()
  eve_name: string;

  @IsBoolean()
  @IsOptional()
  eve_deviceassociated: boolean;

  @IsBoolean()
  @IsOptional()
  eve_medicineassociated: boolean;

  @IsBoolean()
  @IsOptional()
  eve_stay: boolean;

  @IsBoolean()
  @IsOptional()
  eve_mentalhealth: boolean;

  @IsBoolean()
  @IsOptional()
  eve_publichealth: boolean;

  @IsBoolean()
  @IsOptional()
  eve_oncologicalpathology: boolean;

  @IsBoolean()
  @IsOptional()
  eve_medicines: boolean;

  @IsBoolean()
  @IsOptional()
  eve_devices: boolean;

  @IsBoolean()
  @IsOptional()
  eve_chemotherapy: boolean;

  @IsBoolean()
  @IsOptional()
  eve_cerebral: boolean;

  @IsBoolean()
  @IsOptional()
  eve_respiratory: boolean;

  @IsBoolean()
  @IsOptional()
  eve_cardiovascular: boolean;

  @IsBoolean()
  @IsOptional()
  eve_prostate: boolean;

  @IsBoolean()
  @IsOptional()
  eve_renal: boolean;

  @IsBoolean()
  @IsOptional()
  eve_gastrointestinal: boolean;

  @IsBoolean()
  @IsOptional()
  eve_metabolic: boolean;

  @IsBoolean()
  @IsOptional()
  eve_immunological: boolean;

  @IsBoolean()
  @IsOptional()
  eve_nutritional: boolean;

  @IsBoolean()
  @IsOptional()
  eve_transfusional: boolean;

  @IsBoolean()
  @IsOptional()
  eve_changesparaclinical: boolean;

  @IsBoolean()
  @IsOptional()
  eve_surgery: boolean;

  @IsBoolean()
  @IsOptional()
  eve_procedures: boolean;

  @IsBoolean()
  @IsOptional()
  eve_infectious: boolean;
}
