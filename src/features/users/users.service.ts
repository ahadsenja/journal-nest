import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import { User } from './users.entity';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>
  ) { }

  async findAll(): Promise<User[]> {
    const users = this.userRepository.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = ObjectID.isValid(id) && (this.userRepository.findOne(id));
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(createUser: IUser): Promise<User> {
    const user = this.userRepository.save(createUser);
    return user;
  }
}