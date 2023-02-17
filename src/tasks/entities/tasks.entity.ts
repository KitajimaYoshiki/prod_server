import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column('varchar', { length: 30, nullable: false })
  title: string;

  @Column({ type: 'datetime', nullable: true })
  start: Date;

  @Column({ type: 'datetime', nullable: false })
  deadline: Date;

  @Column('varchar', { length: 300, nullable: true })
  memo: string;

  @Column({ default: false })
  done: boolean;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_bin',
  })
  author: string;

  @ManyToOne(() => Users, (users) => users.user_id)
  @JoinColumn({ name: 'author' })
  readonly users?: Users;
}
