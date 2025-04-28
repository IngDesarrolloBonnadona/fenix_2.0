import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DocumentTypeService } from '../services/document-type.service';
import { CreateDocumentTypeDto } from '../dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from '../dto/update-document-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('document-type')
@Controller('document-type')
@ApiBearerAuth()
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Post('/createDocumentType/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createDocumentType(@Body() createDocumentTypeDto: CreateDocumentTypeDto) {
    return this.documentTypeService.createDocumentType(createDocumentTypeDto);
  }

  @Get('/listDocumentTypes/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listDocumentTypes() {
    return this.documentTypeService.findAllDocumentType();
  }

  @Get('/findDocumentType/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findDocumentType(@Param('id') id: number) {
    return this.documentTypeService.findOneDocumentType(id);
  }

  @Patch('/updateDocumentType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateDocumentType(
    @Param('id') id: number,
    @Body() updateDocumentTypeDto: UpdateDocumentTypeDto,
  ) {
    return this.documentTypeService.updateDocumentType(
      id,
      updateDocumentTypeDto,
    );
  }

  @Delete('/deleteDocumentType/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteDocumentType(@Param('id') id: number) {
    return this.documentTypeService.deleteDocumentType(id);
  }
}
