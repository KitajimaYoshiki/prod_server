import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Column } from 'typeorm';

export class createTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  title: string;

  @IsString()
  start: string;

  @IsString()
  @IsNotEmpty()
  deadline: string;

  @IsString()
  @MaxLength(300)
  memo: string;

  @IsBoolean()
  @Column({ default: false })
  done: boolean;
}
