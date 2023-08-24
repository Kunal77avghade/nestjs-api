import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Mailed } from './db/Entity/mailed';
import { Details } from './db/Entity/details';
import { Mail } from './dto/deatails.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly mailService: MailerService,
    @Inject('MAILED_REPOSITORY')
    private mailRepo: Repository<Mailed>,
    @Inject('DETAILS_REPOSITORY')
    private detailsRepo: Repository<Details>,
  ) {}

  async sendMail(details) {
    const tmp = await this.mailService.sendMail({
      to: 'kunal77avghade@gmail.com',
      cc: details.email,
      from: 'kunal77avghade@gmail.com',
      subject: `Vendor Accruals Request - ${details.vendorName}`,
      template: 'mail',
      context: {
        message: details.message,
        vendorName: details.vendorName,
        selectedDate: details.selectedDate,
      },
    });
    console.log(tmp);

    const mail = {
      vendor: details.vendorName,
      mailed_on: new Date(),
      dateFor: details.selectedDate,
    };
    this.save(mail, details.message);
  }

  async sendMailVendor(mail: Mail) {
    const tmp = await this.mailService.sendMail({
      to: mail.email,
      from: 'kunal77avghade@gmail.com',
      subject: 'Remainder',
      template: 'vendor',
      context: {
        vendorName: mail.vendorName,
        selectedDate: mail.selectedDate,
      },
    });
    console.log(tmp);
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
    return this.mailRepo.find({
      order: {
        mailed_on: 'DESC',
      },
    });
  }

  async getOne(id: string) {
    return await this.mailRepo.findOne({
      relations: {
        details: true,
      },
      where: { id: id },
    });
  }

  async getAllWithVendor() {
    const res = await this.detailsRepo
      .createQueryBuilder('details')
      .leftJoinAndSelect('details.mail', 'mailed')
      .select(['details', 'mailed.vendor'])
      .getMany();
    return res.map((item) => ({ ...item, vendor: item.mail.vendor }));
  }

  async delete(id: string) {
    const tmp = await this.getOne(id);
    for (const detail of tmp.details) await this.detailsRepo.remove(detail);
    return await this.mailRepo.remove(tmp);
  }

  async deleteall() {
    await this.detailsRepo.delete({});
    await this.mailRepo.delete({});
  }
}
