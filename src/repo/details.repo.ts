import { constants } from 'src/config/constants';
import { Details } from 'src/db/Entity/details';
import { DataSource } from 'typeorm';

export const DetailsProviders = [
  {
    provide: constants.DETAILS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Details),
    inject: ['DATA_SOURCE'],
  },
];
