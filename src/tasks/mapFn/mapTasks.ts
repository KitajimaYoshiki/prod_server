import { task } from '../dto/task';
import { Tasks } from '../entities/tasks.entity';

export function mapTasks(tasks: Tasks) {
  var task: task = {
    id: tasks.id,
    title: tasks.title,
    start: tasks.start,
    deadline: tasks.deadline,
    memo: tasks.memo,
    done: tasks.done,
  };

  return task;
}
