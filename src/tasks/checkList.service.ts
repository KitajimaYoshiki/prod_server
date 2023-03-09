import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { createItemDto } from './dto/create_item_dto';
import { CheckList } from './entities/checklist.entity';
import { Tasks } from './entities/tasks.entity';

@Injectable()
export class CheckListService {
  constructor(
    @InjectRepository(CheckList)
    private checkListRepository: Repository<CheckList>,
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
  ) {}

  // タスクIDで検索
  // show_completed: true -> 完了も取得, false -> 完了は無視
  async findAll(
    task_id: number,
    show_completed?: boolean,
  ): Promise<CheckList[]> {
    let items = new Array<CheckList>();
    if (show_completed) {
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
  async findTask(id: number): Promise<boolean> {
    const flag = await this.tasksRepository.findOneBy({ id });
    return !!flag;
  }

  // アイテムの有無を調べる
  // ある場合はtrue, ない場合はfalse
  async findItems(task_id: number): Promise<boolean> {
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
  async update(
    task_id: number,
    item_id: number,
    status: boolean,
  ): Promise<CheckList> {
    let data = await this.checkListRepository.findOneBy({
      task_id: task_id,
      item_id: item_id,
    });
    data.done = status;
    await this.checkListRepository.save(data);
    return data;
  }

  // アイテム作成
  async create(addItem: createItemDto): Promise<number> {
    // ID取得
    const finalId: number = await (
      await this.findAll(addItem.task_id, true)
    ).length;

    // 登録
    const createResult: InsertResult = await this.checkListRepository.insert({
      task_id: addItem.task_id,
      item_id: finalId + 1,
      check_item: addItem.name,
    });

    return finalId + 1;
  }
}
