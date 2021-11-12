import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn, OneToMany } from "typeorm";
import { Transaction } from "./transaction.entity";
import { User } from "./users.entity";

@Entity('journals')
export class Journal {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;
  @Column() description: string;
  @ManyToOne(() => User, user => user.journals)
  user: User;
  @OneToMany(() => Transaction, transaction => transaction.journals)
  transactions: Transaction[];
  @Column() userId: string;
}