import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(id: string, password: string) {
    const insertResult = await this.userRepository.insert({
      user_id: id,
      user_pass: password,
    });

    return insertResult;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findUserId(user_id: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ user_id });
    return !!user;
  }

  async findUser(user_id: string): Promise<Users> {
    return await this.userRepository.findOneBy({ user_id });
  }

  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.userRepository.delete(id);
    return Boolean(deleteResult.affected);
  }
}
