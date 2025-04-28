import { Body, Controller, Post } from '@nestjs/common';
import { NodemailerService } from '../services/nodemailer.service';
import { ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from '../dto/send_email.dto';

@ApiTags('nodemailer')
@Controller('nodemailer')
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}

  @Post('/send-email')
  async emailSend(
    @Body()
    {
      from,
      recipients,
      subject,
      emailTemplate,
      userNameToEmail,
      userIdNumberToEmail,
      caseFilingNumberToEmail,
      fenixUrl,
      supportContactEmail,
    }: SendEmailDto,
  ) {
    return await this.nodemailerService.sendEmail({
      from,
      recipients,
      subject,
      emailTemplate,
      userNameToEmail,
      userIdNumberToEmail,
      caseFilingNumberToEmail,
      fenixUrl,
      supportContactEmail,
    });
  }
}
