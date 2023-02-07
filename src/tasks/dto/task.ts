import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class task {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @IsDate()
  start: Date;

  @IsDate()
  @IsNotEmpty()
  deadline: Date;

  @IsString()
  memo: string;

  @IsBoolean()
  @IsNotEmpty()
  done: boolean;
}

export class userId {
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
