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
import { TaskService, UsersService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './dto/user';
import { createHash } from 'crypto';

const salt = process.env.CRYPTO_SALT || 'cryptoSalt';

@Controller('api/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(+id);
  }
}

@Controller('api/tasks')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create_user')
  async create(@Body('user') user: User) {
    // idが使用済みかどうかの確認
    const check_user = this.usersService.findOne(user.id);
    if (check_user != null) {
      throw HttpCode(400);
    }

    // passwordとsaltを結合
    const str = user.password + salt;
    // ハッシュ化
    const hash = createHash('sha256').update(str, 'utf8').digest('hex');

    await this.usersService.create(user.id, hash);
    return HttpCode(201);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return await this.usersService.findOne(+id);
  // }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
