import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { createTagDto } from './dto/create_tag_dto';
import { tag } from './dto/tag';
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

  @Post('add_tag')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body('tag') createTag: createTagDto) {
    // 該当タスクの有無チェック
    const flag: boolean = await this.tagsService.findTask(createTag.task_id);
    if (!flag) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `task_id '${createTag.task_id}' was not found.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // タグ登録
    let createResult: number;
    try {
      createResult = await this.tagsService.create(createTag);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const returnTag: tag = {
      id: createResult,
      name: createTag.name,
    };
    return returnTag;
  }
}
