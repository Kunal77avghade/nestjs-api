import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Details } from './details';

@Entity()
export class Mailed {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vendor: string;

  @Column({ type: 'timestamp' })
  mailed_on: Date;

  @Column()
  dateFor: string;

  @OneToMany(() => Details, (details) => details.mail, { cascade: ['remove'] })
  details: Details[];
}
