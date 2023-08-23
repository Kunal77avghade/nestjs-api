import { DataSource } from 'typeorm';
import { Mailed } from './Entity/mailed';
import { Details } from './Entity/details';

export const DbConnection = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Kunal@77',
        database: 'invoices',
        synchronize: true,
        entities: [Mailed, Details],
        logging: true,
      });
      return await dataSource.initialize();
    },
  },
];
