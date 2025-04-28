import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN AUTH //

  @Post('refreshToken')
  async refreshToken(@Req() request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') || [];

    return this.authService.refreshToken(token);
  }
}
