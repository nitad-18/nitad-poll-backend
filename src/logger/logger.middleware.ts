import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestWithUserId } from 'src/common/types/auth';
import { Logger, RequestWithID } from 'src/common/types/logger';
import { v4 as uuidv4 } from 'uuid';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: LoggerService) {}

  generateRequestID(req: Request, res: Response) {
    const reqID = uuidv4();
    res.append('X-Request-ID', reqID);
    (req as RequestWithID).reqID = reqID;
  }

  extractVaraibles(req: Request, res: Response) {
    return {
      uid: (req as RequestWithUserId).user?.id.toString(),
      method: req.method,
      path: req.path,
      reqBody: JSON.stringify(req.body),
      status: res.statusCode,
    };
  }

  use(req: Request, res: Response, next: () => void) {
    this.generateRequestID(req, res);
    const start: number = Date.now();
    res.on('finish', () => {
      const result = {
        ...this.extractVaraibles(req, res),
        duration: Date.now() - start,
        reqID: (req as RequestWithID).reqID,
      } as Logger;
      this.loggerService.addLog(result);
    });
    next();
  }
}
