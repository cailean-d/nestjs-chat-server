import { Controller, Get, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';
import { ProfileGuard } from 'src/~shared/profile.guard';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers() {
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

  @Patch(':id')
  @UseGuards(ProfileGuard)
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  @UseGuards(ProfileGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

}
