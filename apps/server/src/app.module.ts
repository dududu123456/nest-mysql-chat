import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger2.middleware';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

console.log('process.env.BASE_DATOS_HOST', process.env.BASE_DATOS_HOST);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.development' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.BASE_DATOS_HOST,
      port: parseInt(process.env.BASE_DATOS_PORT, 10),
      username: process.env.BASE_DATOS_USER,
      password: process.env.BASE_DATOS_PASSWORD,
      database: process.env.BASE_DATOS_NAME,
      autoLoadEntities: true, // 自动查找Entity 实体
      synchronize: true, // 自动创建数据库表
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
    CatsModule,
    ChatModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'aaa', method: RequestMethod.ALL },
      );
  }
}
