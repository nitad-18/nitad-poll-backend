import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { serializeError } from 'serialize-error';
import { Error, RequestWithID } from 'src/common/types/logger';
import { LoggerService } from './logger.service';

@Catch()
export class LoggerFilter<T> implements ExceptionFilter {
  constructor(private loggerService: LoggerService) {}
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const req = context.getRequest();
    const res = context.getResponse();

    const err = {
      reqID: (req as RequestWithID).reqID,
      status: 500,
      message: '',
      error: JSON.stringify(serializeError(exception)),
    } as Error;

    if (exception instanceof HttpException) {
      err.status = exception.getStatus();
      if (typeof exception.getResponse() === 'string') {
        err.message = exception.getResponse() as string;
      } else {
        const ex = exception.getResponse() as Record<string, string>;
        if ('message' in ex) {
          err.message = ex['message'];
        }
      }
    }
    if (err.status >= 500) {
      console.error(exception);
      this.loggerService.addError(err);
    }
    res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }
}
