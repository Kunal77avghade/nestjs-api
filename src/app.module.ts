import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as handlebars from 'handlebars';
import { join } from 'path';

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
          adapter: new HandlebarsAdapter(), // Use Handlebars for templates
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
