import { Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventType } from '../event-type/entities/event-type.entity';
import { Unit } from '../unit/entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventType, Unit])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
