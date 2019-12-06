import { IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @Length(3, 30)
  readonly oldPassword: string;

  @IsString()
  @Length(3, 30)
  readonly newPassword: string;
}
