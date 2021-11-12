import { ObjectID } from "typeorm";

export interface IUser {
  // id: string;
  name: string;
  email: string;
  username: string;
  password: string;
}