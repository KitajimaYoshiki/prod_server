import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tags } from './entities/tags.entity';

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

  // タスクの有無を調べる
  // ある場合はtrue, ない場合はfalse
  async findTask(tag_id: number): Promise<boolean> {
    const flag = await this.tagsRepository.findOneBy({ tag_id });
    return !!flag;
  }
}
