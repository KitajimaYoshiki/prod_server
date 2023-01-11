import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SimpleConsoleLogger } from 'typeorm';
import { tags } from './dto/tags';
import { tasks } from './dto/tasks';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tags } from './entities/tags.entity';
import { Tasks } from './entities/tasks.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private tagsRepository: Repository<Tags>,
  ) {}

  // タスクIDで検索
  async findAll(task_id: number) {
    const tags = await this.tagsRepository.findBy({
      task_id: task_id,
    });
    return tags;
  }

  async findTag(tag_id: number): Promise<boolean> {
    const user = await this.tagsRepository.findOneBy({ tag_id });
    return !!user;
  }

  // async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Tasks> {
  //   const updateResult = await this.tagsRepository.update(id, updateTaskDto);

  //   if (updateResult.affected) {
  //     return await this.tagsRepository.findOneBy({ id });
  //   } else {
  //     return;
  //   }
  // }
}
