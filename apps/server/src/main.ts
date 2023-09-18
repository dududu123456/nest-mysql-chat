import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { GlobalGuard } from './common/guard/global.guard';
import { GlobalPipe } from './common/pipe/global.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);

  // 允许跨域 或：const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  // 全局路由前缀
  app.setGlobalPrefix('api');

  // 全局guard卫士
  app.useGlobalGuards(new GlobalGuard());

  // 全局注册过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(new GlobalPipe());
  // 全局使用管道，用于 Controller 层参数校验
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('Hello-nest 接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
