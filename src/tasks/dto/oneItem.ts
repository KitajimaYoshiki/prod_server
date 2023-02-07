import { ValidateNested } from 'class-validator';
import { checkList } from './checkList';

export class oneItem {
  @ValidateNested()
  item: checkList;
}
