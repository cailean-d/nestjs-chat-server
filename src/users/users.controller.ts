import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/~shared/user.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(@User() user: any) {
    return await this.userService.findAll();
  }

  @Get('count')
  async getUserCount() {
    return await this.userService.count();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @Post()
  async register(@Body() user: CreateUserDto) {
    return await this.userService.create(user);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() user: CreateUserDto) {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

}
