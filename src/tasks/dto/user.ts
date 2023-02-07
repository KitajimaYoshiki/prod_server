import { IsAlphanumeric, IsNotEmpty, IsString, Length } from 'class-validator';

export class User {
  @IsString()
  @IsNotEmpty()
  @Length(1, 25)
  @IsAlphanumeric() // 半角a-z A-Z 0-9しか通さないらしい
  id: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 16)
  @IsAlphanumeric()
  password: string;
}
