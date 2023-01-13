import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { itemInfo } from './dto/itemInfo';
import { CheckList } from './entities/checklist.entity';

@Injectable()
export class CheckListService {
  constructor(
    @InjectRepository(CheckList)
    private checkListRepository: Repository<CheckList>,
  ) {}

  // タスクIDで検索
  // show_completed: true -> 完了も取得, false -> 完了は無視
  // show_completedが未入力(null)の場合、true扱いになる
  async findAll(task_id: number, show_completed: boolean) {
    let items = new Array<CheckList>();
    if (show_completed || show_completed == null) {
      items = await this.checkListRepository.findBy({
        task_id: task_id,
      });
    } else {
      items = await this.checkListRepository.findBy({
        task_id: task_id,
        done: false,
      });
    }
    return items;
  }

  // タスクの有無を調べる
  // ある場合はtrue, ない場合はfalse
  async findTask(task_id: number): Promise<boolean> {
    const flag = await this.checkListRepository.findOneBy({ task_id });
    return !!flag;
  }

  // アイテムの有無を調べる
  // ある場合はtrue, ない場合はfalse
  async findItem(task_id: number, item_id: number): Promise<boolean> {
    const flag = await this.checkListRepository.findBy({
      task_id: task_id,
      item_id: item_id,
    });
    return !!flag;
  }

  // 状態更新
  async update(task_id: number, item_id: number, status: boolean) {
    let data = await this.checkListRepository.findOneBy({
      task_id: task_id,
      item_id: item_id,
    });
    data.done = status;
    await this.checkListRepository.save(data);
    return data;
  }
}
