import { Controller, Get, Post, Delete, Param, UseGuards, Body, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectID } from 'typeorm';

import { AuthService } from './auth.service';
import { User } from 'src/~shared/user.decorator';
import { CreateUserDto } from 'src/users/create-user.dto';
import { UserEntity } from 'src/users/user.entity';
import { ResetPasswordDto } from './reset-password.dto';

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

  @Patch('reset-password')
  @UseGuards(AuthGuard('jwt'))
  resetPassword(@User('id') id: ObjectID, @Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(id, data);
  }

}
