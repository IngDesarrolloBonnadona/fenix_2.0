import { Module } from '@nestjs/common';
import { DamageTypeService } from './services/damage-type.service';
import { DamageTypeController } from './controllers/damage-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DamageType } from './entities/damage-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DamageType])],
  controllers: [DamageTypeController],
  providers: [DamageTypeService],
  exports: [DamageTypeService],
})
export class DamageTypeModule {}
