import { IsString, Length, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(3, 30)
  @IsOptional()
  readonly nickname?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;
}
