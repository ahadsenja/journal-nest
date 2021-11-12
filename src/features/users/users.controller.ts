import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Res, UseGuards } from '@nestjs/common';

import { User } from '../../entity/users.entity';
import { UserDTO } from '../../dto/users.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('api/v1/')
export class UsersController {

  constructor(
    private readonly userService: UsersService
  ) { }

  // Get all users
  @UseGuards(JwtAuthGuard)
  @Get('users')
  @HttpCode(200)
  async getAll(@Res() res: Response): Promise<User[]> {
    const result = await this.userService.findAll();
    
    res.status(200).send({
      data: result,
      message: "Successfully retrive users data"
    });
    return;
  }

  // Get user by id
  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  async getById(@Param('id') id: string, @Res() res: Response): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }

    res.send({
      data: user,
      message: 'Successfully retrive user data by id'
    })
    return;
  }

  // Find by condition
  @Get('users')
  async getByCondition(condition: string): Promise<User> {
    const user = await this.userService.findOneByCondition(condition);
    console.log('dari user controller: ' + user); 
    return user;
  }

  // Create new user
  @UseGuards(JwtAuthGuard)
  @Post('users')
  async createUser(@Body() createUser: UserDTO): Promise<User> {
    const user = await this.userService.create(createUser);
    return user;
  }

  // Update user
  @UseGuards(JwtAuthGuard)
  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() userDTO: UserDTO): Promise<User> {
    return await this.userService.update(id, userDTO);
  }

  // Delete user
  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userService.delete(id);
  }

}
