import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity('transactions')
export class Transaction {
  @ObjectIdColumn() id: ObjectID;
  @Column() date: Date;
  @Column() description: string;
  @Column() debit: number;
  @Column() credit: number;
}