import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { PollOptionModule } from './poll-option/poll-option.module';
import { PollModule } from './poll/poll.module';
import { UserModule } from './user/user.module';

//  TODO #TASK 1 setup config of typeorm module
//* Using the configService to setup config for typeorm module

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        port: 
        username: 
        password: 
        database: 
        synchronize: false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    PollModule,
    PollOptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
