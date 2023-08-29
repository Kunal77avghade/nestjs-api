import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Mailed } from './db/Entity/mailed';
import { Details } from './db/Entity/details';
import { DetailsDTO, Mail } from './dto/deatails.dto';
import { constants } from './config/constants';

@Injectable()
export class AppService {
  constructor(
    private readonly mailService: MailerService,
    @Inject(constants.MAILED_REPOSITORY)
    private mailRepo: Repository<Mailed>,
    @Inject(constants.DETAILS_REPOSITORY)
    private detailsRepo: Repository<Details>,
  ) {}

  async sendMail(details: DetailsDTO) {
    try {
      await this.mailService.sendMail({
        to: process.env.ADMIN_EMAIL,
        cc: details.email,
        from: process.env.ADMIN_EMAIL,
        subject: `${constants.SUBJECT_PREFIX} - ${details.vendorName}`,
        template: 'mail',
        context: {
          message: details.message,
          vendorName: details.vendorName,
          selectedDate: details.selectedDate,
        },
      });
    } catch (error) {
      // console.error('service error', error);
      throw new Error(error);
    }
  }

  async sendMailVendor(mail: Mail) {
    try {
      await this.mailService.sendMail({
        to: mail.email,
        from: process.env.ADMIN_EMAIL,
        subject: constants.SUBJECT_VENDOR,
        template: 'vendor',
        context: {
          vendorName: mail.vendorName,
          selectedDate: mail.selectedDate,
          email: mail.email,
        },
      });
    } catch (error) {
      // console.error('service error', error);
      throw new Error(error);
    }
  }

  async saveRecord(data: DetailsDTO) {
    const mail = {
      vendor: data.vendorName,
      mailed_on: new Date(),
      dateFor: data.selectedDate,
    };
    const details = data.message;

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
