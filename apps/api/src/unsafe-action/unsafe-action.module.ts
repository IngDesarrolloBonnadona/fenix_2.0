import { Module } from '@nestjs/common';
import { UnsafeActionService } from './services/unsafe-action.service';
import { UnsafeActionController } from './controllers/unsafe-action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnsafeAction } from './entities/unsafe-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnsafeAction])],
  controllers: [UnsafeActionController],
  providers: [UnsafeActionService],
})
export class UnsafeActionModule {}
