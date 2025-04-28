import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReasonCancellationCaseService } from '../services/reason-cancellation-case.service';
import { CreateReasonCancellationCaseDto } from '../dto/create-reason-cancellation-case.dto';
import { UpdateReasonCancellationCaseDto } from '../dto/update-reason-cancellation-case.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('reason-cancellation-case')
@Controller('reason-cancellation-case')
@ApiBearerAuth()
@Controller('reason-cancellation-case')
export class ReasonCancellationCaseController {
  constructor(
    private readonly reasonCancellationCaseService: ReasonCancellationCaseService,
  ) {}

  @Post('/createReasonCancellationCase/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createReasonCancellationCase(
    @Body() createReasonCancellationCaseDto: CreateReasonCancellationCaseDto,
  ) {
    return this.reasonCancellationCaseService.createReasonCancellationCase(
      createReasonCancellationCaseDto,
    );
  }

  @Get('/listReasonCancellationCases')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listReasonCancellationCases() {
    return this.reasonCancellationCaseService.findAllReasonCancellationCases();
  }

  @Get('/findReasonCancellationCase/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findReasonCancellationCase(@Param('id') id: number) {
    return this.reasonCancellationCaseService.findOneReasonCancellationCase(id);
  }

  @Patch('/updateReasonCancellationCase/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateReasonCancellationCase(
    @Param('id') id: number,
    @Body() updateReasonCancellationCaseDto: UpdateReasonCancellationCaseDto,
  ) {
    return this.reasonCancellationCaseService.updateReasonCancellationCase(
      id,
      updateReasonCancellationCaseDto,
    );
  }

  @Delete('/deleteReasonCancellationCase/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteReasonCancellationCase(@Param('id') id: number) {
    return this.reasonCancellationCaseService.deleteReasonCancellationCase(id);
  }
}
