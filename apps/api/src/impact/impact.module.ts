import { Module } from '@nestjs/common';
import { ImpactService } from './services/impact.service';
import { ImpactController } from './controllers/impact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Impact } from './entities/impact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Impact])],
  controllers: [ImpactController],
  providers: [ImpactService],
})
export class ImpactModule {}
