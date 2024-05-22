import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/users.schema';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);
    if (!user) return null;
    return user;
  }

  async generateAccessToken(user: User) {
    return {
      access_token: this.jwtService.sign({ user }),
    };
  }

  async generateRefreshToken(userID: string) {
    return {
      refresh_token: this.jwtService.sign(
        { userID },
        {
          secret: jwtConstants.secret,
          expiresIn: '30d',
        },
      ),
    };
  }
}
