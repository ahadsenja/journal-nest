import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';

import { User } from '../../entity/users.entity';
import { UserDTO } from '../../dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService
  ) { }

  @Get()
  @HttpCode(200)
  async getAll(): Promise<User[]> {
    const result = await this.userService.findAll();
    return result;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  async createUser(@Body() createUser: UserDTO): Promise<User> {
    return await this.userService.create(createUser);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userDTO: UserDTO): Promise<User> {
    return await this.userService.update(id, userDTO);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userService.delete(id);
  }

}
