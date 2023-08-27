import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('aaa')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   // return this.appService.getHello();
  //   // throw new HttpException(
  //   //   {
  //   //     status: HttpStatus.FORBIDDEN,
  //   //     error: '123123',
  //   //   },
  //   //   HttpStatus.FORBIDDEN,
  //   // );
  //   throw new HttpException('', HttpStatus.FORBIDDEN);
  // }

  // @Get()
  // getHello2(): string {
  //   return 'daata';
  // }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('findOne', id);
    return id;
  }
}
