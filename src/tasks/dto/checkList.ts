import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class checkList {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  done: boolean;
}
