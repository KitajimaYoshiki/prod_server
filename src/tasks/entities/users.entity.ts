import { Param } from '@nestjs/common';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn('varchar', { length: 25, nullable: false })
  user_id: string;

  @Column('varchar', { length: 64, nullable: false })
  user_pass: string;
}
