import { Module } from '@nestjs/common';
import { OptionResearchCategoryService } from './services/option_research_category.service';
import { OptionResearchCategoryController } from './controllers/option_research_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionResearchCategory } from './entities/option_research_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OptionResearchCategory])],
  controllers: [OptionResearchCategoryController],
  providers: [OptionResearchCategoryService],
})
export class OptionResearchCategoryModule {}
