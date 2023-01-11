import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { Tasks } from './tasks/entities/tasks.entity';
import { Users } from './tasks/entities/users.entity';
import { Tags } from './tasks/entities/tags.entity';
import { CheckList } from './tasks/entities/checklist.entity';
import { UsersModule } from './tasks/users.module';
import { TagsModule } from './tasks/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'R04OJTserver_',
      database: 'todos',
      charset: 'utf8mb4',
      synchronize: process.env.NODE_ENV != 'production',
      entities: [Task, Users, Tasks, Tags, CheckList],
    }),
    TasksModule,
    UsersModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
