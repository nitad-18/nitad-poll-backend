import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

//  TODO #TASK 1 Set Service PORT
//* Using the configService to set up the service's Port

//  TODO #TASK 6 Set API Document and Swagger-Stats
//*
//* >> Setup the API Doc
//* HINT Keyword = `nestjs openapi`
//*
//* >> Setup the Swagger-Stats
//* HINT Keyword = `swagger stats`

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  await app.listen(/* PORT */);
}
bootstrap();
