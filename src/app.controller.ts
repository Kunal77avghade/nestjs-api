import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DetailsDTO, Mail } from './dto/deatails.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/data')
  getInvoiceDate(@Body() details: DetailsDTO): string {
    const stat = this.appService.sendMail(details);
    console.log(stat);
    console.log(details);
    return 'ok';
  }

  @Get('/')
  getDetails(): any {
    return this.appService.getAll();
  }

  @Get('/download')
  getDetailsDownload(): any {
    return this.appService.getAllWithVendor();
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.appService.delete(id);
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.appService.getOne(id);
  }

  @Post('/sendmail')
  sendMail(@Body() mail: Mail): string {
    this.appService.sendMailVendor(mail);
    return 'ok';
  }

  @Delete()
  async deleteAll() {
    await this.appService.deleteall();
    return 'ok';
  }
}
