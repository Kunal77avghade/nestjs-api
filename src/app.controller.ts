import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DetailsDTO, Mail } from './dto/deatails.dto';
import { Serialize } from './intercepter/serialize.intercepter';
import { DataWithVendor } from './dto/response.details.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/data')
  async getInvoiceDate(@Body() details: DetailsDTO) {
    try {
      await this.appService.sendMail(details);
      await this.appService.saveRecord(details);
      return 'ok';
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Post('/sendmail')
  sendMail(@Body() mail: Mail) {
    try {
      this.appService.sendMailVendor(mail);
      return 'ok';
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('/')
  getDetails() {
    return this.appService.getAll();
  }

  @Get('/download')
  @Serialize(DataWithVendor)
  getDetailsDownload() {
    return this.appService.getAllWithVendor();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    const detail = await this.appService.getOne(id);
    if (!detail) throw new NotFoundException('detail not found ');
    return detail;
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.appService.delete(id);
  }

  @Delete()
  async deleteAll() {
    await this.appService.deleteall();
    return 'ok';
  }
}
