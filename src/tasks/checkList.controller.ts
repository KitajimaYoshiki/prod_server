import { usePinInputDescendantsContext } from '@chakra-ui/react';
import {
  Body,
  Controller,
  DefaultValuePipe,
  HttpCode,
  HttpException,
  HttpStatus,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CheckListService } from './checkList.service';
import { checkList } from './dto/checkList';
import { itemInfo } from './dto/itemInfo';
import { oneItem } from './dto/oneItem';
import { CheckList } from './entities/checklist.entity';
import { mapCheckList } from './mapFn/mapCheskList';

@Controller('api/tasks')
export class CheckListController {
  constructor(private readonly checkListService: CheckListService) {}

  @Post('get_check')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Body('task_id', ParseIntPipe) task_id: number,
    @Body('show_completed', new DefaultValuePipe(true))
    show_completed?: boolean,
  ) {
    // 該当タスクの有無チェック
    const flag = await this.checkListService.findTask(task_id);
    if (!flag) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `task_id '${task_id}' was not found.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // アイテムの受け取り
    const result = await this.checkListService.findAll(task_id, show_completed);
    if (result.length == 0) {
      return null;
    }
    return result.map(mapCheckList);
  }

  @Put('check')
  async update(
    @Body('item_info') item_info: itemInfo,
    @Body('status', ParseBoolPipe) status: boolean,
  ) {
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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 表示データへ変換
    const inItem: checkList = {
      id: updateItem.item_id,
      name: updateItem.check_item,
      done: updateItem.done,
    };

    const returnItem: oneItem = {
      item: inItem,
    };

    return returnItem;
  }
}
