import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckList } from './entities/checklist.entity';
import { CheckListController } from './checkList.controller';
import { CheckListService } from './checkList.service';

@Module({
  imports: [TypeOrmModule.forFeature([CheckList])],
  controllers: [CheckListController],
  providers: [CheckListService],
})
export class CheckListModule {}
