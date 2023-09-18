import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class GlobalPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    // const val = parseInt(value, 10);
    // if (isNaN(val)) {
    //   throw new BadRequestException('Validation failed');
    // }
    console.log('===Global Pipe===', value);
    return value;
  }
}
