import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';

import { User } from '../../entity/users.entity';
import { UserDTO } from '../../dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService
  ) { }

  // Get all users
  @Get()
  @HttpCode(200)
  async getAll(): Promise<User[]> {
    const result = await this.userService.findAll();
    return result;
  }

  // Get user by id
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  // Find by email
  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return user;
  }

  // Create new user
  @Post()
  async createUser(@Body() createUser: UserDTO): Promise<User> {
    return await this.userService.create(createUser);
  }

  // Update user
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userDTO: UserDTO): Promise<User> {
    return await this.userService.update(id, userDTO);
  }

  // Delete user
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userService.delete(id);
  }

}
