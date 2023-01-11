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
import { TaskService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all/user_id/:user_id/show_completed/:show_completed')
  async findAll(
    @Param('user_id') user_id: string,
    @Param('show_completed') show_completed: boolean,
  ) {
    return await this.taskService.findAll(user_id, show_completed);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.update(+id, updateTaskDto);
  }
}
