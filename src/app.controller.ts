import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DetailsDTO } from './dto/deatails.dto';

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
}
