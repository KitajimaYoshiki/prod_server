import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tags } from './entities/tags.entity';
import { Tasks } from './entities/tasks.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private tagsRepository: Repository<Tags>,
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
  ) {}

  // タスクIDで検索
  async findAll(task_id: number) {
    const tags = await this.tagsRepository.findBy({
      task_id: task_id,
    });
    return tags;
  }

  // タグの有無を調べる
  // ある場合はtrue, ない場合はfalse
  async findTags(tag_id: number): Promise<boolean> {
    const flag = await this.tagsRepository.findOneBy({ tag_id });
    return !!flag;
  }

  // タスクの有無を調べる
  // ある場合はtrue, ない場合はfalse
  async findTask(tag_id: number): Promise<boolean> {
    const flag = await this.tasksRepository.findOneBy({ id: tag_id });
    return !!flag;
  }
}
