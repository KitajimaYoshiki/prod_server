import { Center } from '@chakra-ui/react';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { createHash } from 'crypto';
import { User } from './dto/user';
import { UsersService } from './users.service';

const salt = process.env.CRYPTO_SALT || 'cryptoSalt';

@Controller('api/tasks')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create_user')
  @HttpCode(HttpStatus.CREATED)
  async create_user(@Body('user') user: User) {
    // idが使用済みかどうかの確認
    const check = await this.usersService.findUserId(user.id);
    if (check) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `user_id '${user.id}' is already taken.`,
        },
        400,
      );
    }

    // passwordとsaltを結合
    const str = user.password + salt;
    // ハッシュ化
    const hash = createHash('sha256').update(str, 'utf8').digest('hex');
    try {
      await this.usersService.create(user.id, hash);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error.',
        },
        500,
      );
    }
    return;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body('user') user: User) {
    // ユーザーの有無を確認
    const check = await this.usersService.findUserId(user.id);
    if (!check) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `user_id '${user.id}' is not found.`,
        },
        400,
      );
    }
    // ユーザー情報取得
    const entryUser = await this.usersService.findUser(user.id);
    // passwordとsaltを結合
    const str = user.password + salt;
    // ハッシュ化
    const hash = createHash('sha256').update(str, 'utf8').digest('hex');

    // 認証（文字列比較）
    if (hash === entryUser.user_pass) {
      return;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: `user_id '${user.id}' is not found.`,
        },
        401,
      );
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
