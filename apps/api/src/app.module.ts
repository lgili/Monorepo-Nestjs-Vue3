import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   // <- torna o ConfigService disponível em toda a app
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        transport: {
          host: cs.get('MAIL_HOST'),
          port: cs.get<number>('MAIL_PORT'),
          auth: {
            user: cs.get('MAIL_USER'),
            pass: cs.get('MAIL_PASS'),
          },
        },
        defaults: {
          from: cs.get('MAIL_FROM'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    UsersModule, AuthModule, PrismaModule],
})
export class AppModule {}
