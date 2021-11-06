import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { AppService } from './app.service';
import { UsersService } from './features/users/users.service';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService, 
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  // Register new user
  @Post('auth/register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string
  ){
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.userService.create({
      name,
      email, 
      username, 
      password: hashedPassword
    });
    delete user.password; // For remove password when returning data
    return user;
  }

  // Login user
  @Post('auth/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough: true}) res: Response 
  ) {
    const user = await this.userService.findOneByCondition({email});
    if (!user) {
      throw new BadRequestException('Invalid credentials, User not found');
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      throw new BadRequestException('Invalid credentials, Invalid email or password');
    }

    const jwt = await this.jwtService.signAsync({id: user.id});
    res.cookie('jwt', jwt, {httpOnly: true});
    return res.send({
      message: "Login success",
      "access_token": jwt
    })
  }

  // Check authenticated user
  @Get('user')
  async user(@Req() req: Request) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.userService.findOneById(data['id']);
      const {password, ...result} = user;
      return result;
    } catch (error) {
      throw new UnauthorizedException();
    }
    
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

}
