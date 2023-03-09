import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { createTaskDto } from './dto/create_task_dto';
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
  async findAll(user: string, show_completed?: boolean): Promise<task[]> {
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

  // 全件取得
  async findAllUsersTasks(): Promise<task[]> {
    let allTasks = new Array<task>();
    allTasks = await this.tasksRepository.find();
    return allTasks;
  }

  // タスクの状態更新
  async update(id: number, status: boolean): Promise<Tasks> {
    let data = await this.tasksRepository.findOneBy({ id });
    data.done = status;
    return await this.tasksRepository.save(data);
  }

  // タスク作成
  async create(userId: string, createTask: createTaskDto): Promise<number> {
    // ID取得
    const finalId: number = (await this.findAllUsersTasks()).length;

    const createResult: InsertResult = await this.tasksRepository.insert({
      id: finalId + 1,
      title: createTask.title,
      start: createTask.start,
      deadline: createTask.deadline,
      memo: createTask.memo,
      done: createTask.done,
      author: userId,
    });
    return finalId + 1;
  }
}
