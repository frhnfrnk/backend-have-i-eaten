import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Qna } from './qna.entity';
import { CreateQnaDto, UpdateQnaDto } from './qna.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class QnaService {
  constructor(
    @InjectRepository(Qna)
    private qnaRepository: Repository<Qna>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createQnaDto: CreateQnaDto): Promise<Qna> {
    const { question, answer, askerId } = createQnaDto;

    const asker = await this.userRepository.findOne({ where: { id: askerId } });
    if (!asker) {
      throw new Error('User not found');
    }

    const qna = this.qnaRepository.create({
      question,
      asker,
    });

    return await this.qnaRepository.save(qna);
  }

  async findAll(): Promise<Qna[]> {
    return await this.qnaRepository.find({
      relations: ['asker'],
    });
  }

  async findOne(id: number): Promise<Qna> {
    const qna = await this.qnaRepository.findOne({
      where: { id },
      relations: ['asker'],
    });

    if (!qna) {
      throw new NotFoundException(`Qna with ID ${id} not found`);
    }

    return qna;
  }

  async update(id: number, updateQnaDto: UpdateQnaDto): Promise<Qna> {
    const qna = await this.qnaRepository.findOne({
      where: { id },
      relations: ['asker'],
    });

    if (!qna) {
      throw new NotFoundException(`Qna with ID ${id} not found`);
    }

    const { question, answer, askerId } = updateQnaDto;

    if (question !== undefined) qna.question = question;
    if (answer !== undefined) qna.answer = answer;

    if (askerId !== undefined) {
      const asker = await this.userRepository.findOne({
        where: { id: askerId },
      });
      if (!asker) {
        throw new NotFoundException(`User with ID ${askerId} not found`);
      }
      qna.asker = asker;
    }
    return await this.qnaRepository.save(qna);
  }

  async remove(id: number): Promise<void> {
    await this.qnaRepository.delete(id);
  }
}
