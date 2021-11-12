import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { UsersService } from './features/users/users.service';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService, 
    private userService: UsersService,
    private jwtService: JwtService,
    private authService: AuthService
  ) { }

  // Register new user
  @Post('api/v1/auth/register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    let saltRound = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, saltRound);
    console.log(hashedPassword);
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
  @Post('api/v1/auth/login')
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

    const payload = {id: user.id, name: user.name}
    const jwt = await this.jwtService.signAsync(payload);
    res.cookie('jwt', jwt, {httpOnly: true});
    return({
      access_token: jwt,
      message: "Success generated token"
    })
  }

  // Check authenticated user
  @Get('api/v1/user')
  async user(@Req() req: Request, @Res() res: Response) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.userService.findOneByCondition({id: data['id']});
      const { password, ...result } = user;
      res.send(result);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  // Logout
  @Post('api/v1/auth/logout')
  async logout(@Res({passthrough: true}) res: Response){
    res.clearCookie('jwt');
    return {
      message: 'Logout success'
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
