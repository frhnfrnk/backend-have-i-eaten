// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Content, Qna, Admin],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ContentModule,
    AdminModule,
    QnaModule,
  ],
})
export class AppModule {}
