import { Module } from '@nestjs/common';
import { ReasonCancellationCaseService } from './services/reason-cancellation-case.service';
import { ReasonCancellationCaseController } from './controllers/reason-cancellation-case.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReasonCancellationCase } from './entities/reason-cancellation-case.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReasonCancellationCase])],
  controllers: [ReasonCancellationCaseController],
  providers: [ReasonCancellationCaseService],
})
export class ReasonCancellationCaseModule {}
