import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from './dto/user';
import { Task } from './entities/task.entity';
import { Users } from './entities/users.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const insertResult = await this.taskRepository.insert(createTaskDto);

    return this.taskRepository.findOneBy({
      id: insertResult.identifiers[0].id,
    });
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: number) {
    return await this.taskRepository.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updateResult = await this.taskRepository.update(id, updateTaskDto);

    if (updateResult.affected) {
      return await this.taskRepository.findOneBy({ id });
    } else {
      return;
    }
  }

  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.taskRepository.delete(id);
    return Boolean(deleteResult.affected);
  }
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(id: string, password: string) {
    const insertResult = await this.userRepository.insert({
      user_id: id,
      user_pass: password,
    });

    return insertResult;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(user_id: string): Promise<Users> {
    return await this.userRepository.findOneBy({ user_id });
  }

  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.userRepository.delete(id);
    return Boolean(deleteResult.affected);
  }
}
