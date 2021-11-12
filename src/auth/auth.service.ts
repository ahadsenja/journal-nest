import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/features/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByCondition(email);
        if (user && user.password === password) {
            const { password, email, ...result } = user;
            return result;
        }
        return null;
    }

    async loginUser(user: any) {
        const payload = { 
            email: user.email, 
            sub: user.id
        };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
