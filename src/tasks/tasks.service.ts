import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto) {
    return {
      id: 1,
      content: createTaskDto.content,
      done: false,
    };
  }

  findAll() {
    return [
      { id: 1, content: 'my first todo', done: false },
      { id: 2, content: 'my second todo', done: false },
      { id: 3, content: 'my third todo', done: true },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return {
      id,
      ...updateTaskDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
