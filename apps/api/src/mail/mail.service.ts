// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService as NestMailer } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailer: NestMailer,
    private readonly config: ConfigService,
  ) {}

  /** Envia email de reset de senha */
  async sendResetPasswordEmail(to: string, token: string) {
    const appUrl = this.config.get('APP_URL');
    const resetLink = `${appUrl}/reset-password?token=${token}`;
    const expiresHours = 1; // ou pegue da config

    await this.mailer.sendMail({
      to,
      subject: 'Reset your MyApp password',
      template: 'reset-password', // nome do arquivo .hbs
      context: { resetLink, expiresHours },
    });
  }
}
