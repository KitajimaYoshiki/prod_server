import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { task } from './dto/task';
import { Tasks } from './entities/tasks.entity';
import { Users } from './entities/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  // 作者で検索
  // show_completed: true -> 完了も取得, false -> 完了は無視
  async findAll(user: string, show_completed?: boolean) {
    let tasks = new Array<task>();
    // show_completedによる分岐
    if (show_completed) {
      tasks = await this.tasksRepository.findBy({
        author: user,
      });
    } else {
      tasks = await this.tasksRepository.findBy({
        author: user,
        done: false,
      });
    }

    return tasks;
  }

  // 作者検索
  // いた場合はtrue, いない場合はfalse
  async findUserId(user_id: string): Promise<boolean> {
    const flag = await this.userRepository.findOneBy({ user_id });
    return !!flag;
  }

  // タスクの有無を調べる
  // ある場合はtrue, ない場合はfalse
  async findTask(id: number): Promise<boolean> {
    const flag = await this.tasksRepository.findOneBy({ id });
    return !!flag;
  }

  // タスクの状態更新
  async update(id: number, status: boolean): Promise<Tasks> {
    let data = await this.tasksRepository.findOneBy({ id });
    data.done = status;
    return await this.tasksRepository.save(data);
  }
}
