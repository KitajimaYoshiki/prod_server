import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { mapTags } from './mapFn/mapTags';
import { TagsService } from './tags.service';

@Controller('api/tasks')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('get_tags')
  @HttpCode(HttpStatus.OK)
  async findAll(@Body('task_id') task_id: number) {
    // 入力値チェック
    // 必須項目の入力チェック
    if (!task_id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `task_id is required.`,
        },
        400,
      );
    }
    // 該当タスクの有無チェック
    const flag = await this.tagsService.findTask(task_id);
    if (!flag) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `task_id '${task_id}' was not found.`,
        },
        400,
      );
    }

    // タグ受け取り
    const result = await this.tagsService.findAll(task_id);
    return result.map(mapTags);
  }
}
