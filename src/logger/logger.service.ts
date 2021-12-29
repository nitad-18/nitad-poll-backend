import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Error, Logger } from 'src/common/types/logger';

@Injectable()
export class LoggerService {
  private writeApi: WriteApi;

  constructor(private configService: ConfigService) {
    const client = this.initializeConnection();
    this.writeApi = client.getWriteApi(
      this.configService.get<string>('influx.org'),
      this.configService.get<string>('influx.bucket'),
    );
  }

  private initializeConnection() {
    const client = new InfluxDB({
      url: `${this.configService.get<string>('influx.host')}:${this.configService.get<number>(
        'influx.port',
      )}`,
      token: this.configService.get<string>('influx.token'),
    });
    return client;
  }

  private createPoint(log: Logger) {
    return new Point('event')
      .tag('uid', log.uid)
      .tag('method', log.method)
      .tag('path', log.path)
      .tag('reqID', log.reqID)
      .tag('status', log.status.toString())
      .tag('duration', log.duration.toString())
      .stringField('reqBody', log.reqBody);
  }
  private createError(error: Error) {
    return new Point('error')
      .tag('reqID', error.reqID)
      .tag('status', error.status.toString())
      .stringField('error', error.error);
  }

  addLog(log: Logger) {
    const point = this.createPoint(log);
    this.writeApi.writePoint(point);
  }

  addError(error: Error) {
    const point = this.createError(error);
    this.writeApi.writePoint(point);
  }
}
