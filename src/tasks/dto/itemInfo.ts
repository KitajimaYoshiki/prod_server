import { IsInt, IsNotEmpty } from 'class-validator';

export class itemInfo {
  @IsInt()
  @IsNotEmpty()
  task_id: number;

  @IsInt()
  @IsNotEmpty()
  item_id: number;
}
