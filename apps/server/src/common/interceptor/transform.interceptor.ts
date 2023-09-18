import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('===Global interceptor before===');

    const now = Date.now();

    return next.handle().pipe(
      map((data) => {
        const { msg, ...rest } = data;
        return {
          data: rest,
          code: 0,
          msg: msg || 'Request successful',
        };
      }),
      tap(() => {
        console.log('===Global interceptor after===', Date.now() - now + 'ms');
      }),
    );
  }
}
