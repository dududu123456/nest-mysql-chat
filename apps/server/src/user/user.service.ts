import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  async register(createUser: CreateUserDto) {
    const { username } = createUser;

    const existUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existUser) {
      throw new HttpException('username exist', HttpStatus.CONFLICT);
    }
    try {
      // add
      await this.userRepository.save(Object.assign(new User(), createUser));
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
    // find
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async login(loginUser: LoginUserDto, res: Response) {
    const { username, email, password } = loginUser;

    interface UserProps {
      username: string;
      email: string;
    }
    const params: UserProps = {} as UserProps;
    if (email) {
      const newEmail = email.toLowerCase();
      params.email = newEmail;
    } else {
      throw new HttpException('params miss', HttpStatus.NOT_FOUND);
    }
    if (username) {
      params.username = username;
    }
    const existUser = await this.userRepository.findOne({
      where: params,
    });

    // console.log('existUser', existUser);
    if (!existUser) {
      throw new HttpException('user not exist', HttpStatus.NOT_FOUND);
    }
    if (!bcrypt.compareSync(password, existUser.password)) {
      throw new HttpException('password err', HttpStatus.NOT_FOUND);
    }
    const token = await this.jwtService.signAsync({
      user: {
        id: existUser.id,
        email: existUser.email,
      },
    });

    res.setHeader('token', 'bearer ' + token);
    return existUser;
  }

  async findAll() {
    return await this.userRepository.find();
  }
}
