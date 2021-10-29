import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/features/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }

  // async validateUser(email: string, password: string): Promise<any> {
  //   // const user = await this.userService.findOneByEmail(email);
  //   if (user && user.password === password) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
}
