import { Controller, Get, Post, Delete, Param, UseGuards, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { User } from 'src/~shared/user.decorator';
import { CreateUserDto } from 'src/users/create-user.dto';
import { UserEntity } from 'src/users/user.entity';

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
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('local'))
  async login(@User() user: UserEntity) {
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
