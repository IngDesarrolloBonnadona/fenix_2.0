import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { IGeneralContextEmail } from '../interfaces/general_context_email.interface';

export class SendEmailDto {
  @IsOptional()
  @IsEmail()
  from?: string;

  @IsNotEmpty()
  recipients: string[];

  @IsOptional()
  @IsString()
  subject?: string;

  @IsNotEmpty()
  @IsString()
  emailTemplate: string;

  @IsNotEmpty()
  @IsString()
  userNameToEmail: string;

  @IsOptional()
  @IsNumber()
  userIdNumberToEmail: number;

  @IsOptional()
  @IsString()
  caseFilingNumberToEmail: string;

  @IsOptional()
  @IsObject()
  generalContextToEmail?: IGeneralContextEmail;

  @IsOptional()
  @IsString()
  fenixUrl: string;

  @IsOptional()
  @IsString()
  supportContactEmail: string;
}
