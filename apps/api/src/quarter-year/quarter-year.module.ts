import { Module } from '@nestjs/common';
import { QuarterYearService } from './services/quarter-year.service';
import { QuarterYearController } from './controllers/quarter-year.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuarterYear } from './entities/quarter-year.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuarterYear])],
  controllers: [QuarterYearController],
  providers: [QuarterYearService],
})
export class QuarterYearModule {}
