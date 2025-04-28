import { Module } from '@nestjs/common';
import { FluidTypeService } from './services/fluid-type.service';
import { FluidTypeController } from './controllers/fluid-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FluidType } from './entities/fluid-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FluidType])],
  controllers: [FluidTypeController],
  providers: [FluidTypeService],
  exports: [FluidTypeService],
})
export class FluidTypeModule {}
