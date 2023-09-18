import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('===Module middleware logger===', req.url);
    next();
  }
}

// 或者
function logger(req: Request, res: Response, next: NextFunction) {
  console.log(req);
  next();
}
