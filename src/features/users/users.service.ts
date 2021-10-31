import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import { User } from '../../entity/users.entity';
import { IUser } from '../../interface/users.interface';
import { UserDTO } from 'src/dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>
  ) { }

  // Find all users
  async findAll(): Promise<User[]> {
    const users = this.userRepository.find();
    return users;
  }

  // Find user by id
  async findOneById(id: string): Promise<User> {
    const user = ObjectID.isValid(id) && this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  // Find user by username
  async findOneByUsername(username: string): Promise<User> {
    const user = this.userRepository.findOne({ username });
    return user;
  }

  // Create new user
  async create(createUser: IUser): Promise<User> {
    return this.userRepository.save(createUser);
  }

  // Update user
  async update(id: string, updateUser: IUser): Promise<User> {
    const user = ObjectID.isValid(id) && this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    this.userRepository.update(id, updateUser);
    return user;
  }

  // Delete user
  async delete(id: string): Promise<User> {
    const user = ObjectID.isValid(id) && this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    this.userRepository.delete(id);
    return user;
  }
}