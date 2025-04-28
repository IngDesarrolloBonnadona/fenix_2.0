import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InfluencingFactorService } from '../services/influencing-factor.service';
import { CreateInfluencingFactorDto } from '../dto/create-influencing-factor.dto';
import { UpdateInfluencingFactorDto } from '../dto/update-influencing-factor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('influencing-factor')
@Controller('influencing-factor')
@ApiBearerAuth()
export class InfluencingFactorController {
  constructor(
    private readonly influencingFactorService: InfluencingFactorService,
  ) {}

  @Post('/createInfluencingFactor/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createInfluencingFactor(
    @Body() createInfluencingFactorDto: CreateInfluencingFactorDto,
  ) {
    return this.influencingFactorService.createInfluencingFactor(
      createInfluencingFactorDto,
    );
  }

  @Get('/listInfluencingFactors/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listInfluencingFactors() {
    return this.influencingFactorService.findAllInfluencingFactors();
  }

  @Get('/findInfluencingFactor/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findInfluencingFactor(@Param('id') id: number) {
    return this.influencingFactorService.findOneInfluencingFactor(id);
  }

  @Patch('/updateInfluencingFactor/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateInfluencingFactor(
    @Param('id') id: number,
    @Body() updateInfluencingFactorDto: UpdateInfluencingFactorDto,
  ) {
    return this.influencingFactorService.updateInfluencingFactor(
      id,
      updateInfluencingFactorDto,
    );
  }

  @Delete('/deleteInfluencingFactor/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteInfluencingFactor(@Param('id') id: number) {
    return this.influencingFactorService.deleteInfluencingFactor(id);
  }
}
