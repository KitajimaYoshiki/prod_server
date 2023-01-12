import { checkList } from '../dto/checkList';
import { CheckList } from '../entities/checklist.entity';

export function mapCheckList(checkList: CheckList) {
  const item: checkList = {
    id: checkList.item_id,
    name: checkList.check_item,
    done: checkList.done,
  };

  return item;
}
