import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReasonReturnCaseService } from '../services/reason-return-case.service';
import { CreateReasonReturnCaseDto } from '../dto/create-reason-return-case.dto';
import { UpdateReasonReturnCaseDto } from '../dto/update-reason-return-case.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('reason-return-case')
@Controller('reason-return-case')
@ApiBearerAuth()
export class ReasonReturnCaseController {
  constructor(
    private readonly reasonReturnCaseService: ReasonReturnCaseService,
  ) {}

  @Post('/createReasonReturnCase/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createReasonReturnCase(
    @Body() createReasonReturnCaseDto: CreateReasonReturnCaseDto,
  ) {
    return this.reasonReturnCaseService.createReasonReturnCase(
      createReasonReturnCaseDto,
    );
  }

  @Get('/listReasonReturnCases/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listReasonReturnCases() {
    return this.reasonReturnCaseService.findAllReasonReturnCases();
  }

  @Get('/findReasonReturnCase/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findReasonReturnCase(@Param('id') id: number) {
    return this.reasonReturnCaseService.findOneReasonReturnCase(id);
  }

  @Get('/findReasonReturnCasebyRoleId/:roleid/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findReasonReturnCasebyRoleId(@Param('roleid') roleid: number) {
    return this.reasonReturnCaseService.findOneReasonReturnCaseByRoleId(roleid);
  }

  @Patch('/updateReasonReturnCase/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateReasonReturnCase(
    @Param('id') id: number,
    @Body() updateReasonReturnCaseDto: UpdateReasonReturnCaseDto,
  ) {
    return this.reasonReturnCaseService.updateReasonReturnCase(
      id,
      updateReasonReturnCaseDto,
    );
  }

  @Delete('/deleteReasonReturnCase/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteReasonReturnCase(@Param('id') id: number) {
    return this.reasonReturnCaseService.deleteReasonReturnCase(id);
  }
}
