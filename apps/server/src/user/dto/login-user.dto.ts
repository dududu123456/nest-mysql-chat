import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  username?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
