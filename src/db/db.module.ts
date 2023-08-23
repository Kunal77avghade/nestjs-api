import { Module } from '@nestjs/common';
import { DbConnection } from './db.connector';

@Module({
  providers: [...DbConnection],
  exports: [...DbConnection],
})
export class DbModule {}
