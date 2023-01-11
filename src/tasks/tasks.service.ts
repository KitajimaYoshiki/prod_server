import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SimpleConsoleLogger } from 'typeorm';
import { tasks } from './dto/tasks';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from './entities/tasks.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Tasks)
    private taskRepository: Repository<Tasks>,
  ) {}

  // async create(createTaskDto: CreateTaskDto): Promise<Task> {
  //   const insertResult = await this.taskRepository.insert(createTaskDto);

  //   return this.taskRepository.findOneBy({
  //     id: insertResult.identifiers[0].id,
  //   });
  // }

  // 作者で検索
  // show_completed: true -> 完了も取得, false -> 完了は無視
  async findAll(user: string, show_completed: boolean) {
    let tasks = new Array<tasks>();
    // show_completedによる分岐
    if (show_completed) {
      tasks = await this.taskRepository.findBy({
        author: user,
      });
    } else {
      tasks = await this.taskRepository.findBy({
        author: user,
        done: false,
      });
    }

    return tasks;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Tasks> {
    const updateResult = await this.taskRepository.update(id, updateTaskDto);

    if (updateResult.affected) {
      return await this.taskRepository.findOneBy({ id });
    } else {
      return;
    }
  }
}
