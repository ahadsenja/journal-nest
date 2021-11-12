import { Entity, ObjectID, ObjectIdColumn, Column, OneToMany } from 'typeorm';
import { Journal } from './journal.entity';

@Entity('users')
export class User {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;
  @Column() email: string;
  @Column() username: string;
  @Column() password: string;
  @OneToMany(() => Journal, journal => journal.user)
  journals: Journal[];
}