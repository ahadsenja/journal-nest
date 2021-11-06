import { ObjectID } from "typeorm";

export interface IUser {
  name: string;
  email: string;
  username: string;
  password: string;
}