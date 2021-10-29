import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;
  @Column() email: string;
  @Column() username: string;
  @Column() password: string;
}