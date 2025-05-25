// src/auth/auth.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  
  @Injectable()
  export class CustomAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers?.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException('Token not provided');
      }
  
      // tira o “Bearer ” (case-insensitive) do início
      const token = authHeader.replace(/Bearer\s+/i, '').trim();
      if (!token) {
        throw new UnauthorizedException('Token malformed');
      }
  
      try {
        // seu método que verifica assinatura, expiração etc.
        const payload = await this.authService.validateToken(token);
  
        // injeta o payload (por ex. userId, email…) no request
        req.user = payload;
  
        return true;
      } catch (err) {
        // pode lançar ForbiddenException ou UnauthorizedException
        throw new ForbiddenException(err.message || 'Invalid token');
      }
    }
  }
  