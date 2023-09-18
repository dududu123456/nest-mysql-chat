import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户相关接口')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @Post('login')
  login(
    @Body() loginUser: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // res.setHeader('Content-Type', 'application/json)

    return this.userService.login(loginUser, res);
  }

  @Get('findAll')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '获取用户列表',
    // description: '获取所有的用户列表',
  })
  @ApiResponse({
    status: 200,
    description: '成功返回200',
    schema: {
      type: 'array',
      example: [
        {
          id: 1,
          username: 'aaa',
          email: 'aaa.163.com',
        },
      ],
    },
  })
  async findAll() {
    await mockAwait(500);
    return await this.userService.findAll();
  }
}

function mockAwait(timeDiff: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('');
    }, timeDiff);
  });
}
