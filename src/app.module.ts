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

handlebars.registerHelper('splitdate', (date: string) => {
  console.log(typeof date, date);
  return date.split('T')[0];
});

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          auth: {
            user: 'kunal77avghade@gmail.com',
            pass: 'devmniovyayewxnl',
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
