import { IsDate, IsDefined, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  content: string;

  @IsString()
  @IsDefined()
  deadline: Date;
}
