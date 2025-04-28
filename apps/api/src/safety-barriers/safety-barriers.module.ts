import { Module } from '@nestjs/common';
import { SafetyBarriersService } from './services/safety-barriers.service';
import { SafetyBarriersController } from './controllers/safety-barriers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SafetyBarrier } from './entities/safety-barrier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SafetyBarrier])],
  controllers: [SafetyBarriersController],
  providers: [SafetyBarriersService],
  exports: [SafetyBarriersService],
})
export class SafetyBarriersModule {}
