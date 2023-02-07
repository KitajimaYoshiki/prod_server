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
  DefaultValuePipe,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { mapTasks } from './mapFn/mapTasks';
import { task } from './dto/task';
import { oneTask } from './dto/oneTask';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('all')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Body('user_id') user_id: string,
    @Body('show_completed', new DefaultValuePipe(false))
    show_completed?: boolean,
  ) {
    // 入力値チェック
    // 入力チェック NULL,字種,字数チェック
    if (
      !user_id ||
      !user_id.match(/^[a-zA-Z0-9]*$/) ||
      !(0 < user_id.length && user_id.length <= 25)
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `user_id is required and can be up to 25 alphanumeric characters.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // タスク受け取り
    const result = await this.tasksService.findAll(user_id, show_completed);
    if (result.length == 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `user_id '${user_id}' was not found.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result.map(mapTasks);
  }

  @Put('task')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body('task_id', ParseIntPipe) task_id: number,
    @Body('status', ParseBoolPipe) status: boolean,
  ) {
    // 入力値チェック
    // 必須項目の入力チェック
    if (!task_id || status == null) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `task_id and status are required.`,
        },
        HttpStatus.BAD_REQUEST,
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
        HttpStatus.BAD_REQUEST,
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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 表示データへ変換
    const inTask: task = {
      id: updateTask.id,
      title: updateTask.title,
      start: updateTask.start,
      deadline: updateTask.deadline,
      memo: updateTask.memo,
      done: updateTask.done,
    };

    const returnTask: oneTask = {
      task: inTask,
    };

    return returnTask;
  }
}
