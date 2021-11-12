import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn } from "typeorm";
import { Journal } from "./journal.entity";

@Entity('transactions')
export class Transaction {
  @ObjectIdColumn() id: ObjectID;
  @Column() date: Date;
  @Column() description: string;
  @Column() debit: number;
  @Column() credit: number;
  @ManyToOne(() => Journal, journal => journal.transactions)
  journals: Journal;
  @Column() journalId: string;
}