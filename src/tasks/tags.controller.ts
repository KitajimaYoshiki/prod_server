import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TagsService } from './tags.service';

@Controller('api/tasks')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get('get_tags/task_id/:task_id')
  async findAll(@Param('task_id') task_id: number) {
    return await this.tagsService.findAll(task_id);
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return await this.tagsService.update(+id, updateTaskDto);
  // }
}
