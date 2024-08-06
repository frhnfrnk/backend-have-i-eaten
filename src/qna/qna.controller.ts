import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { QnaService } from './qna.service';
import { Qna } from './qna.entity';
import { AuthGuard } from '@nestjs/passport';
import { PremiumGuard } from 'src/auth/premium.guard';

@Controller('qna')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body('question') question: string): Promise<Qna> {
    return this.qnaService.create(question);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), PremiumGuard)
  async findAll(): Promise<Qna[]> {
    return this.qnaService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), PremiumGuard)
  async findOne(@Param('id') id: number): Promise<Qna> {
    return this.qnaService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: number,
    @Body('answer') answer: string,
  ): Promise<Qna> {
    return this.qnaService.update(id, answer);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: number): Promise<void> {
    return this.qnaService.remove(id);
  }
}
