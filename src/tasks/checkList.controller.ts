import { usePinInputDescendantsContext } from '@chakra-ui/react';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { CheckListService } from './checkList.service';
import { checkList } from './dto/checkList';
import { itemInfo } from './dto/itemInfo';
import { CheckList } from './entities/checklist.entity';
import { mapCheckList } from './mapFn/mapCheskList';

@Controller('api/tasks')
export class CheckListController {
  constructor(private readonly checkListService: CheckListService) {}

  @Post('get_check')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Body('task_id') task_id: number,
    @Body('show_completed') show_completed: boolean,
  ) {
    // 入力値チェック
    // 必須項目の入力チェック
    if (!task_id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `task_id is required.`,
        },
        400,
      );
    }
    // 該当タスクの有無チェック
    const flag = await this.checkListService.findTask(task_id);
    if (!flag) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `task_id '${task_id}' was not found.`,
        },
        400,
      );
    }

    // アイテムの受け取り
    const result = await this.checkListService.findAll(task_id, show_completed);
    return result.map(mapCheckList);
  }

  @Put('check')
  async update(
    @Body('item_info') item_info: itemInfo,
    @Body('status') status: boolean,
  ) {
    // 入力値チェック
    // 必須項目のチェック
    if (
      !item_info ||
      !item_info.item_id ||
      !item_info.task_id ||
      status == null
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `item_info and status are required.`,
        },
        400,
      );
    }

    // 変数
    let updateItem: CheckList;

    // 更新処理
    try {
      updateItem = await this.checkListService.update(
        item_info.task_id,
        item_info.item_id,
        status,
      );
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error.',
        },
        500,
      );
    }

    const returnItem: checkList = {
      id: updateItem.item_id,
      name: updateItem.check_item,
      done: updateItem.done,
    };

    return returnItem;
  }
}
