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
import { AskDto, CreateQnaDto, UpdateQnaDto } from './qna.dto';
import { AdminGuard } from '../auth/admin.guard';

@Controller('qna')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Post('admin')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async createFromAdmin(@Body() createQnaDto: CreateQnaDto): Promise<Qna> {
    return this.qnaService.createFromAdmin(createQnaDto);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), PremiumGuard)
  async createFromUser(@Body() askDto: AskDto): Promise<Qna> {
    return this.qnaService.createFromUser(askDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), PremiumGuard)
  async findAllFromUser(): Promise<Qna[]> {
    return this.qnaService.findAllFromUser();
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async findAllFromAdmin(): Promise<Qna[]> {
    return this.qnaService.findAllFromAdmin();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), PremiumGuard)
  async findOne(@Param('id') id: number): Promise<Qna> {
    return this.qnaService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateQnaDto: UpdateQnaDto,
  ): Promise<Qna> {
    return this.qnaService.update(id, updateQnaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: number): Promise<void> {
    return this.qnaService.remove(id);
  }
}
