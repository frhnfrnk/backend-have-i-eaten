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
import { CreateQnaDto, UpdateQnaDto } from './qna.dto';

@Controller('qna')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), PremiumGuard)
  async create(@Body('qna') CreateQnaDto: CreateQnaDto): Promise<Qna> {
    return this.qnaService.create(CreateQnaDto);
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
    @Body('qna') UpdateQnaDto: UpdateQnaDto,
  ): Promise<Qna> {
    return this.qnaService.update(id, UpdateQnaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: number): Promise<void> {
    return this.qnaService.remove(id);
  }
}
