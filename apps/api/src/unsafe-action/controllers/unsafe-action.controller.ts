import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UnsafeActionService } from '../services/unsafe-action.service';
import { CreateUnsafeActionDto } from '../dto/create-unsafe-action.dto';
import { UpdateUnsafeActionDto } from '../dto/update-unsafe-action.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('unsafe-action')
@Controller('unsafe-action')
@ApiBearerAuth()
export class UnsafeActionController {
  constructor(private readonly unsafeActionService: UnsafeActionService) {}

  @Post('/createUnsafeAction/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createUnsafeAction(@Body() createUnsafeActionDto: CreateUnsafeActionDto) {
    return this.unsafeActionService.createUnsafeAction(createUnsafeActionDto);
  }

  @Get('/listUnsafeActions/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listUnsafeActions() {
    return this.unsafeActionService.findAllUnsafeActions();
  }

  @Get('/findUnsafeAction/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findUnsafeAction(@Param('id') id: number) {
    return this.unsafeActionService.findOneUnsafeActions(id);
  }

  @Patch('/updateUnsafeAction/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateUnsafeAction(
    @Param('id') id: number,
    @Body() updateUnsafeActionDto: UpdateUnsafeActionDto,
  ) {
    return this.unsafeActionService.updateUnsafeAction(
      id,
      updateUnsafeActionDto,
    );
  }

  @Delete('/deleteUnsafeAction/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteUnsafeAction(@Param('id') id: number) {
    return this.unsafeActionService.deleteUnsafeAction(id);
  }
}
