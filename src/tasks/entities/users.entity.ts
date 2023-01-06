import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn('varchar', { length: 26, nullable: false })
  user_id: String;
}
