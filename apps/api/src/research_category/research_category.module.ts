import { Module } from '@nestjs/common';
import { ResearchCategoryService } from './services/research_category.service';
import { ResearchCategoryController } from './controllers/research_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearchCategory } from './entities/research_category.entity';
import { ResearchInstrumentModule } from '../research-instrument/research-instrument.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResearchCategory]),
    ResearchInstrumentModule,
  ],
  controllers: [ResearchCategoryController],
  providers: [ResearchCategoryService],
})
export class ResearchCategoryModule {}
