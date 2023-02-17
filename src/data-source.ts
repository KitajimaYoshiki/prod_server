import { DataSource } from 'typeorm';
import { DATA_SOURCE_OPTIONS } from './config';
import { CheckList } from './tasks/entities/checklist.entity';
import { Tags } from './tasks/entities/tags.entity';
import { Tasks } from './tasks/entities/tasks.entity';
import { Users } from './tasks/entities/users.entity';
export const DataSourceOptions = {
  ...DATA_SOURCE_OPTIONS,
  entities: [Tasks, Users, Tags, CheckList],
};
export const AppDataSource = new DataSource(DataSourceOptions);
