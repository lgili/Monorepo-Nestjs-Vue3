import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { randomBytes } from 'crypto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  /**
   * Valida um token JWT:
   * - Verifica assinatura e expiração.
   * - Retorna o payload decodificado se válido.
   * - Lança UnauthorizedException caso o token seja inválido ou expirado.
   */
  async validateToken(token: string): Promise<JwtPayload> {
    try {
      // verifica assinatura e expiração
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
      
      // opcional: você pode aqui buscar o usuário no banco
      // const user = await this.usersService.findByEmail(payload.email);
      // if (!user) throw new UnauthorizedException('Usuário não encontrado');
      // console.log(user)

      return payload;
    } catch (err) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user['password']);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: process.env.JWT_SECRET, expiresIn: '15m' }
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' }
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async login(user: any, res: any) {
    const tokens = await this.getTokens(user.userId, user.email);
    res.cookie('Refresh', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    
    return { accessToken: tokens.accessToken           
     };
  }

  async getUser(user: any) {    
    const currentUser = await this.usersService.findByEmail(user.email);
  
    if (!currentUser) throw new UnauthorizedException('Invalid credentials');
    const safeUser = plainToInstance(UserResponseDto, currentUser, {
      excludeExtraneousValues: true,
    });
    return safeUser;
  }

  async refresh(user: any, res: any) {
    const tokens = await this.getTokens(user.userId, user.email);
    res.cookie('Refresh', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { accessToken: tokens.accessToken };
  }

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    return this.usersService.create({
      firstName: dto.firstName,
      lastName:  dto.lastName,
      username:  dto.username,
      email:     dto.email,
      password:  hash
    });
  }

  /** Gera token, salva no usuário e dispara o e-mail */
  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // para evitar revelar se o e-mail existe ou não,
      // opcionalmente retorne um “200 OK” mesmo assim
      throw new BadRequestException('Email not found');
    }

    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600_000); // 1h

    await this.usersService.update(user.id, {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    });

    await this.mailService.sendResetPasswordEmail(email, token);
  }

  /**
   * Verifica token, atualiza password e limpa campos de reset.
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // 1) Busca usuário pelo token ainda não expirado
    const user = await this.usersService.findByResetToken(token);
    if (!user) {
      throw new BadRequestException('Token inválido ou expirado.');
    }

    // 2) Hash da nova senha
    const hashed = await bcrypt.hash(newPassword, 10);

    // 3) Atualiza password e limpa os campos de reset
    await this.usersService.update(user.id, {
      password: hashed,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });
  }
}
