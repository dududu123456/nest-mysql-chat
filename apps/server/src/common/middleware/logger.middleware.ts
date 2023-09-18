import { NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('===global middleware logger===', req.url);
  next();
}
