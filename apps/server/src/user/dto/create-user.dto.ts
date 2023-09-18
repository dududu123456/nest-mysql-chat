import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username should not be empty' })
  @IsString()
  @ApiProperty({ example: 'aaa', description: '用户名' })
  username: string;

  @IsEmail()
  @ApiProperty({ example: 'aaa.163.com', description: '用户email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '', description: '用户密码' })
  password: string;
}
