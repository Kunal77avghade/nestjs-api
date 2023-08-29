import { Expose } from 'class-transformer';

export class DataWithVendor {
  @Expose()
  id: string;
  @Expose()
  start: string;
  @Expose()
  end: string;
  @Expose()
  comment: string;
  @Expose()
  ammount: number;
  @Expose()
  vendor: string;
}
