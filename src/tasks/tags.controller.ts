import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { mapTags } from './mapFn/mapTags';
import { TagsService } from './tags.service';

@Controller('api/tasks')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('get_tags')
  @HttpCode(HttpStatus.OK)
  async findAll(@Body('task_id', ParseIntPipe) task_id: number) {
    // 該当タスクの有無チェック
    const flag = await this.tagsService.findTask(task_id);
    if (!flag) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `task_id '${task_id}' was not found.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // タグ受け取り
    const result = await this.tagsService.findAll(task_id);
    if (result.length == 0) {
      return null;
    }
    return result.map(mapTags);
  }
}
