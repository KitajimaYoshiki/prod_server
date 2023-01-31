import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/tasks.entity';
import { Users } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasks]),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
