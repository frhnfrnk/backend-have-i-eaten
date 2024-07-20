// src/content/content.controller.ts
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ContentService } from './content.service';
import { AuthGuard } from '@nestjs/passport';
import { PremiumGuard } from '../auth/premium.guard';
import { Request } from 'express';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Post()
  async createContent(
    @Body()
    createContentDto: {
      title: string;
      body: string;
      isPremium: boolean;
    },
  ) {
    return this.contentService.createContent(
      createContentDto.title,
      createContentDto.body,
      createContentDto.isPremium,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllContent(@Req() req: Request) {
    return this.contentService.getAllContent();
  }

  @Get('premium')
  @UseGuards(AuthGuard('jwt'), PremiumGuard)
  async getPremiumContent(@Req() req: Request) {
    return this.contentService.getPremiumContent();
  }
}
