import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() authDto: AuthDto) {
    return this.authService.registeration(authDto);
  }

  @Post('login')
  login(@Body() authData: AuthDto) {
    return this.authService.loggingIn(authData);
  }
}
