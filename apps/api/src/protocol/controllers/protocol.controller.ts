import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProtocolService } from '../services/protocol.service';
import { CreateProtocolDto } from '../dto/create-protocol.dto';
import { UpdateProtocolDto } from '../dto/update-protocol.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('protocol')
@Controller('protocol')
@ApiBearerAuth()
export class ProtocolController {
  constructor(private readonly protocolService: ProtocolService) {}

  @Post('/createProtocol/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createProtocol(@Body() createProtocolDto: CreateProtocolDto) {
    return this.protocolService.createProtocol(createProtocolDto);
  }

  @Get('/listProtocols')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listProtocols() {
    return this.protocolService.findAllProtocols();
  }

  @Get('/findProtocol/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findProtocol(@Param('id') id: number) {
    return this.protocolService.findOneProtocol(id);
  }

  @Patch('/updateProtocol/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateProtocol(
    @Param('id') id: number,
    @Body() updateProtocolDto: UpdateProtocolDto,
  ) {
    return this.protocolService.updateProtocol(id, updateProtocolDto);
  }

  @Delete('/deleteProtocol/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteProtocol(@Param('id') id: number) {
    return this.protocolService.deleteProtocol(id);
  }
}
