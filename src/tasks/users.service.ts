import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(id: string, password: string): Promise<InsertResult> {
    const insertResult = await this.userRepository.insert({
      user_id: id,
      user_pass: password,
    });

    return insertResult;
  }

  async findUserId(user_id: string): Promise<boolean> {
    const flag = await this.userRepository.findOneBy({ user_id });
    return !!flag;
  }

  async findUser(user_id: string): Promise<Users> {
    return await this.userRepository.findOneBy({ user_id });
  }
}
