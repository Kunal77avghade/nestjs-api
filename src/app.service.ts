import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(details) {
    const tmp = await this.mailService.sendMail({
      to: details.email,
      from: 'kunal77avghade.com',
      subject: details.subject,
      template: 'mail',
      context: {
        message: details.message,
      },
    });

    console.log(tmp);
  }
}
