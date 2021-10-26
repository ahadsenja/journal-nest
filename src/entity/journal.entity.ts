import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity('journals')
export class Journal {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;
  @Column() description: string;
}