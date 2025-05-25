import {
  Controller,
  Post, 
  Body, 
  Res, 
  UseGuards, 
  Req, 
  UsePipes,
  ValidationPipe,
  ClassSerializerInterceptor,
  ConflictException,
  UseInterceptors,
  Get
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CustomAuthGuard } from './auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user, res);
  }

  @UseGuards(CustomAuthGuard)
  @Get('me')
  async getUser(@CurrentUser() payload: any) {
      // console.log(payload)  
      return this.authService.getUser(payload);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res) {
    return this.authService.refresh(req.user, res);
  }

  @Post('forgot-password')
  async forgot(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto.email);
    return { message: 'If that email is in our system, you’ll receive a reset link shortly.' };
  }

  @Post('reset-password')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto.token, dto.newPassword);
    return { message: 'Senha atualizada com sucesso.' };
  }
}
