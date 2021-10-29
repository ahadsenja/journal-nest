import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import { User } from '../../entity/users.entity';
import { IUser } from '../../interface/users.interface';

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

  // Find user by email
  async findByEmail(email: string) {
    const user = this.userRepository.findOne({ email });
    if (user) {
      return user
    }

    throw new NotFoundException();
  }

  // Create new user
  async create(createUser: IUser): Promise<User> {
    const user = this.userRepository.save(createUser);
    return user;
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