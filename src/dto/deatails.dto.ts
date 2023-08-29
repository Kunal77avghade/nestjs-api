import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class DetailsDTO {
  @IsEmail()
  email: string;

  @IsString()
  vendorName: string;

  @IsString()
  selectedDate: string;

  @ValidateNested()
  @Type(() => Form)
  message: Form[];
}

export class Form {
  @Type(() => Date)
  @IsDate()
  start: Date;
  @Type(() => Date)
  @IsDate()
  end: Date;
  @IsString()
  comment: string;
  @IsNumber()
  ammount: number;
}

export class Mail {
  @IsEmail()
  email: string;

  @IsString()
  vendorName: string;

  @IsString()
  selectedDate: string;
}
