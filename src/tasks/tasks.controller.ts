import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  HttpException,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { mapTasks } from './mapFn/mapTasks';
import { tasks } from './dto/tasks';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('all')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Body('user_id') user_id: string,
    @Body('show_completed') show_completed: boolean,
  ) {
    // 入力値チェック
    // 必須項目の入力チェック
    if (!user_id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `user_id is required.`,
        },
        400,
      );
    }
    // 該当作者の有無
    const flag = await this.tasksService.findUserId(user_id);
    if (!flag) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `user_id '${user_id}' was not found.`,
        },
        400,
      );
    }

    // タスク受け取り
    const result = await this.tasksService.findAll(user_id, show_completed);

    return result.map(mapTasks);
  }

  @Put('task')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body('task_id') task_id: number,
    @Body('status') status: boolean,
  ) {
    // 入力値チェック
    // 必須項目の入力チェック
    if (!task_id || status == null) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `task_id and status are required.`,
        },
        400,
      );
    }
    // 該当タスクの有無
    const flag = await this.tasksService.findTask(task_id);
    if (!flag) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `user_id '${task_id}' was not found.`,
        },
        400,
      );
    }

    // 変数
    let updateTask;

    // 更新
    try {
      updateTask = await this.tasksService.update(task_id, status);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error.',
        },
        500,
      );
    }

    // 表示データへ変換
    const returnTask: tasks = {
      id: updateTask.id,
      title: updateTask.title,
      start: updateTask.start,
      deadline: updateTask.deadline,
      memo: updateTask.memo,
      done: updateTask.done,
    };

    return returnTask;
  }
}
