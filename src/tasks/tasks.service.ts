import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
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
