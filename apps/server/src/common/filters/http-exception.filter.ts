import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    /**
     * @todo 这里后期要根据<status>状态码，对应的去映射<code>码给前端
     * code === -1 ：前端直接全局报message的错
     * code === [其它] 单独进行特殊场景判断
     */
    const exceptionResponse: any = exception.getResponse();
    let validMessage = '';
    for (const key in exception) {
      console.log('===过滤器===', key, exception[key]);
    }
    // 获取response中的message
    if (typeof exceptionResponse === 'object') {
      validMessage =
        typeof exceptionResponse.message === 'string'
          ? exceptionResponse.message
          : exceptionResponse.message[0];
    }
    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;

    // 错误信息
    const errorResponse = {
      daa: {},
      message: validMessage || message,
      code: -1,
    };

    // 设置返回的状态码，请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
