import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/create-user.dto';
import { JwtPayload } from './jwt-payload.model';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.getOneByEmail(email);
    return (user && (await user.comparePassword(password))) ? user : null;
  }

  async login(user: UserEntity) {
    const payload: JwtPayload = { nickname: user.nickname, sub: user.id.toHexString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    const createdUser = await this.usersService.create(user);
    return this.login(createdUser);
  }

}
