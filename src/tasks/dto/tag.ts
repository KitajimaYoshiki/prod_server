import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class tag {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
