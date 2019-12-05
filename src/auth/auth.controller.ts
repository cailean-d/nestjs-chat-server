import { Controller, Get, Post, Delete, Param, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { User } from 'src/~shared/user.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User as IUser } from 'src/users/interfaces/users.model';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Get('check')
  checkStatus() {
    return true;
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@User() user: IUser) {
    return this.authService.login(user);
  }

  @Delete('logout')
  logout() {
    return null;
  }

  @Post('confirm/:hash')
  confirmAccount(@Param('hash') hash: string) {
    return null;
  }

}
