import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/interfaces/users.model';
import { JwtPayload } from './jwt-payload.model';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.getOneByEmail(email);
    return (user && user.password === password) ? user : null;
  }

  async login(user: User) {
    const payload: JwtPayload = { nickname: user.nickname, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    const createdUser = await this.usersService.create(user);
    return this.login(createdUser);
  }

}
