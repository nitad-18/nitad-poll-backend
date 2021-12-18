import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as SwaggerStats from 'swagger-stats';
import { AppModule } from './app.module';

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

  const config = new DocumentBuilder()
    .setTitle('Nitad Poll API')
    .setDescription('For Nitad Training Session')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('User')
    .addTag('Poll')
    .addTag('Poll Option')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(SwaggerStats.getMiddleware({ swaggerSpec: document }));

  await app.listen(configService.get<number>('port'));
}
bootstrap();
