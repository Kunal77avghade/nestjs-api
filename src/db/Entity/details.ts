import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mailed } from './mailed';

@Entity()
export class Details {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp' })
  end: Date;

  @Column()
  ammount: number;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => Mailed, (mail) => mail.details)
  mail: Mailed;
}
