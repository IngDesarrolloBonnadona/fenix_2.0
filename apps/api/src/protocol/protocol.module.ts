import { Module } from '@nestjs/common';
import { ProtocolService } from './services/protocol.service';
import { ProtocolController } from './controllers/protocol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Protocol } from './entities/protocol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Protocol])],
  controllers: [ProtocolController],
  providers: [ProtocolService],
})
export class ProtocolModule {}
