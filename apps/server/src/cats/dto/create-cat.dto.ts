import { IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString()
  name: string;

  @IsNumber({ allowNaN: false }, { message: 'age is number' })
  age: number;

  breed: string;

  createTime: Date;

  updateTime: Date;
}
