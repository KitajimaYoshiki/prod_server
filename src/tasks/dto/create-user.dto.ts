import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  user_id: String;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  user_pass: String;
}
