import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';

import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/create-user.dto';
import { JwtPayload } from './jwt-payload.model';
import { UserEntity } from 'src/users/user.entity';
import { ResetPasswordDto } from './reset-password.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new BadRequestException();
    }
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

  async resetPassword(id: ObjectID, data: ResetPasswordDto) {
    const user = await this.usersService.getById(id);
    if (!user || !(await user.comparePassword(data.oldPassword))) {
      throw new BadRequestException();
    }
    user.password = data.newPassword;
    await user.hashPassword();
    await this.userRepository.save(user);

    return { updated: true };
  }

}
