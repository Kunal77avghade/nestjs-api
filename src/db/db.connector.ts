import { DataSource } from 'typeorm';
import { Mailed } from './Entity/mailed';
import { Details } from './Entity/details';

export const DbConnection = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        entities: [Mailed, Details],
      });
      return await dataSource.initialize();
    },
  },
];
