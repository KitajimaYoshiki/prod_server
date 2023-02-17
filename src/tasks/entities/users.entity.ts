import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn({
    type: 'varchar',
    length: 25,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_bin',
  })
  user_id: string;

  @Column('varchar', { length: 64, nullable: false })
  user_pass: string;
}
