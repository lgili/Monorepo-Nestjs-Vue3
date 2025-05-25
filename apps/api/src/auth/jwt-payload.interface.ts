// src/auth/jwt-payload.interface.ts
export interface JwtPayload {
    sub: number;     // geralmente o ID do usuário
    email: string;   // ou outro campo que você inclua no token
    iat?: number;
    exp?: number;
  }
  