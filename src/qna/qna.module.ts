import { Module } from '@nestjs/common';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qna } from './qna.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.entity';
import { Admin } from 'src/admin/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Qna]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Admin]),
  ],
  controllers: [QnaController],
  providers: [QnaService],
  exports: [QnaService],
})
export class QnaModule {}
