// src/content/content.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content) private contentRepository: Repository<Content>,
  ) {}

  async createContent(
    title: string,
    body: string,
    isPremium: boolean,
  ): Promise<Content> {
    const newContent = this.contentRepository.create({
      title,
      body,
      isPremium,
    });
    return this.contentRepository.save(newContent);
  }

  async getAllContent(): Promise<Content[]> {
    return this.contentRepository.find();
  }

  async getPremiumContent(): Promise<Content[]> {
    return this.contentRepository.find({ where: { isPremium: true } });
  }
}
