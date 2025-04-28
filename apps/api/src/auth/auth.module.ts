import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANTS_SECRET,
      signOptions: { expiresIn: process.env.EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}