import { Module } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './entities/tags.entity';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tags])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
