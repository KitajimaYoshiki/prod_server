import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Tasks } from './tasks.entity';

@Entity()
export class CheckList {
  @PrimaryColumn({ unsigned: true })
  task_id: number;

  @PrimaryColumn({ unsigned: true })
  item_id: number;

  @Column('text', { nullable: false })
  check_item: string;

  @Column({ default: false })
  done: boolean;

  @ManyToOne(() => Tasks, (tasks) => tasks.id)
  @JoinColumn({ name: 'task_id' })
  readonly tasks?: Tasks;
}
