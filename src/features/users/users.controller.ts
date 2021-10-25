import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';

import { User } from './users.entity';
import { UserDTO } from './users.dto';
import { UsersService } from './users.service';
import { ObjectID } from 'mongodb';

@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService
  ) { }

  @Get()
  @HttpCode(200)
  async getAll(): Promise<User[]> {
    const result = await this.userService.findAll();
    console.log(result)
    return result;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    console.log('ini adalah id dari user controller: ' + id);
    return user;
  }

  @Post('/create')
  async createUser(@Body() createUser: UserDTO): Promise<User> {
    return await this.userService.create(createUser);
  }

}
