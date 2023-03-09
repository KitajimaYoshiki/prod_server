import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class createTagDto {
  @IsInt()
  @IsNotEmpty()
  task_id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
