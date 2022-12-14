import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  content: string;

  @IsString()
  @IsDefined()
  deadline: Date;
}
