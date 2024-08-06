import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Qna } from './qna.entity';

@Injectable()
export class QnaService {
  constructor(
    @InjectRepository(Qna)
    private qnaRepository: Repository<Qna>,
  ) {}

  async create(question: string): Promise<Qna> {
    const newQna = this.qnaRepository.create({ question });
    return await this.qnaRepository.save(newQna);
  }

  async findAll(): Promise<Qna[]> {
    return await this.qnaRepository.find();
  }

  async findOne(id: number): Promise<Qna> {
    return await this.qnaRepository.findOne({ where: { id } });
  }

  async update(id: number, answer: string): Promise<Qna> {
    const qna = await this.findOne(id);
    if (qna) {
      qna.answer = answer;
      return await this.qnaRepository.save(qna);
    }
    return null;
  }

  async remove(id: number): Promise<void> {
    await this.qnaRepository.delete(id);
  }
}
