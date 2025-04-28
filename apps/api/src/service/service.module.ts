import { Module } from '@nestjs/common';
import { ServiceService } from './services/service.service';
import { ServiceController } from './controllers/service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { UnitModule } from '../unit/unit.module';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), UnitModule],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
