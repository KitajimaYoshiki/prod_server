import { Module } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TasksModule {}
