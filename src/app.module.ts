// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { User } from './users/user.entity';
import { Content } from './content/content.entity';
import { QnaModule } from './qna/qna.module';
import * as dotenv from 'dotenv';
import { Qna } from './qna/qna.entity';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/admin.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, Content, Qna, Admin],
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    ContentModule,
    AdminModule,
    QnaModule,
  ],
})
export class AppModule {}
