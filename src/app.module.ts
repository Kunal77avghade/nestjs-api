import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as handlebars from 'handlebars';
import { join } from 'path';
import { DbModule } from './db/db.module';
import { DetailsProviders } from './repo/details.repo';
import { MaliedProviders } from './repo/mailed.repo';
import { ConfigModule } from '@nestjs/config';

handlebars.registerHelper(
  'splitdate',
  (date: Date) => date.toJSON().split('T')[0],
);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.EMAIL_HOST,
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASS,
          },
        },
        template: {
          dir: join(__dirname, '/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    DbModule,
  ],
  controllers: [AppController],
  providers: [...DetailsProviders, ...MaliedProviders, AppService],
})
export class AppModule {}
