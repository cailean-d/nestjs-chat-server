import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 30)
  readonly nickname: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(6, 30)
  readonly password: string;
}
