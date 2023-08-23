// import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Mailed } from './db/Entity/mailed';
import { Details } from './db/Entity/details';

@Injectable()
export class AppService {
  constructor(
    // private readonly mailService: MailerService,
    @Inject('MAILED_REPOSITORY')
    private mailRepo: Repository<Mailed>,
    @Inject('DETAILS_REPOSITORY')
    private detailsRepo: Repository<Details>,
  ) {}

  async sendMail(details) {
    /*    const tmp = await this.mailService.sendMail({
      to: details.email,
      from: 'kunal77avghade@gmail.com',
      subject: details.subject,
      template: 'mail',
      context: {
        message: details.message,
        vendorName: details.vendorName,
        selectedDate: details.selectedDate,
      },
    });
    */
    const mail = {
      vendor: details.vendorName,
      mailed_on: new Date(),
      dateFor: details.selectedDate,
    };
    this.save(mail, details.message);
  }

  async save(mail: Partial<Mailed>, details: Partial<Details>[]) {
    const details_entity = details.map((d) => this.detailsRepo.create(d));
    const saved_details = await this.detailsRepo.save(details_entity);

    const mailed_entity = this.mailRepo.create(mail);
    mailed_entity.details = saved_details;
    const saved_mail = await this.mailRepo.save(mailed_entity);

    return { saved_mail, saved_details };
  }

  getAll() {
    return this.mailRepo.find();
  }

  async getOne(id: string) {
    return await this.mailRepo.findOne({
      relations: {
        details: true,
      },
      where: { id: id },
    });
  }

  async delete(id: string) {
    return await this.mailRepo.remove(await this.getOne(id));
  }
}
