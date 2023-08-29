import { constants } from 'src/config/constants';
import { Mailed } from 'src/db/Entity/mailed';
import { DataSource } from 'typeorm';

export const MaliedProviders = [
  {
    provide: constants.MAILED_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Mailed),
    inject: ['DATA_SOURCE'],
  },
];
