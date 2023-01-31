import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckList } from './entities/checklist.entity';
import { CheckListController } from './checkList.controller';
import { CheckListService } from './checkList.service';
import { Tasks } from './entities/tasks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckList]),
    TypeOrmModule.forFeature([Tasks]),
  ],
  controllers: [CheckListController],
  providers: [CheckListService],
})
export class CheckListModule {}
