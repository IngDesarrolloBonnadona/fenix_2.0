import { Module } from '@nestjs/common';
import { PriorityService } from './services/priority.service';
import { PriorityController } from './controllers/priority.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Priority } from './entities/priority.entity';
import { SeverityClasificationModule } from '../severity-clasification/severity-clasification.module';
import { SeverityClasification } from '../severity-clasification/entities/severity-clasification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Priority, SeverityClasification]),
    SeverityClasificationModule,
  ],
  controllers: [PriorityController],
  providers: [PriorityService],
  exports: [PriorityService],
})
export class PriorityModule {}
