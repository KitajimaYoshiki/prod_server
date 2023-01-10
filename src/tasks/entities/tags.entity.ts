import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Tasks } from './tasks.entity';

@Entity()
export class Tags {
  @PrimaryColumn({ unsigned: true })
  task_id: number;

  @PrimaryColumn({ unsigned: true })
  tag_id: number;

  @Column('text', { nullable: false })
  tag_name: string;

  @ManyToOne(() => Tasks, (tasks) => tasks.id)
  @JoinColumn({ name: 'task_id' })
  readonly tasks?: Tasks;
}
