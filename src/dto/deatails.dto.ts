import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';

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
  @IsString()
  start: string;
  @IsString()
  end: string;
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
