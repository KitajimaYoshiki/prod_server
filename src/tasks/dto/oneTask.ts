import { ValidateNested } from 'class-validator';
import { task } from './task';

export class oneTask {
  @ValidateNested()
  task: task;
}
