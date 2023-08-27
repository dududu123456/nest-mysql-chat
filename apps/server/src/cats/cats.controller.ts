import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  // @Post()
  // @HttpCode(204)
  // create0(): string {
  //   return 'This action adds a new cat';
  // }

  @Get('ab*cd')
  @Header('Cache-Control', 'none')
  findAll0(@Req() request: Request, @Query('qq') qq: string): string {
    // localhost:3000/cats/abbcd?qq=12
    console.log('123', request.url, request.method, qq);
    return 'This action returns all cats';
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log('createCatDto', createCatDto);
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll() {
    return await this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Req() request: Request, @Param('id') id: string) {
    // localhost:3000/cats/2
    console.log('findOne', request.url, request.method, id);
    return await this.catsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    // localhost:3000/cats/2
    console.log('update', request.url, request.method, id, updateCatDto);
    return await this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  async remove(@Req() request: Request, @Param('id') id: string) {
    // localhost:3000/cats/2
    console.log('update', request.url, request.method, id);
    return await this.catsService.remove(+id);
  }
}
