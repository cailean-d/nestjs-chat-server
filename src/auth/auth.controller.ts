import { Controller, Get, Post, Delete, Param } from '@nestjs/common';

@Controller('auth')
export class AuthController {

  @Get('check')
  checkStatus() {
    return true;
  }

  @Post('reg')
  register() {
    return null;
  }

  @Post('login')
  login() {
    return null;
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
