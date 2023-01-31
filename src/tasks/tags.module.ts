import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './entities/tags.entity';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tasks } from './entities/tasks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tags]),
    TypeOrmModule.forFeature([Tasks]),
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
