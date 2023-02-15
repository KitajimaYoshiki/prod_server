import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './tasks/users.module';
import { TagsModule } from './tasks/tags.module';
import { CheckListModule } from './tasks/checkList.module';
import { DataSourceOptions } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(DataSourceOptions),
    TasksModule,
    UsersModule,
    TagsModule,
    CheckListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
