import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);

  // 允许跨域 或：const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  // 全局路由前缀
  app.setGlobalPrefix('api');

  // 全局注册过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局使用管道，用于 Controller 层参数校验
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
