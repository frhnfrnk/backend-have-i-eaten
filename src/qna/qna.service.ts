import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Qna, QnaStatus } from './qna.entity';
import { AskDto, CreateQnaDto, UpdateQnaDto } from './qna.dto';
import { User } from 'src/users/user.entity';
import { Admin } from 'src/admin/admin.entity';

@Injectable()
export class QnaService {
  constructor(
    @InjectRepository(Qna)
    private qnaRepository: Repository<Qna>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Admin)
    private AdminRepository: Repository<Admin>,
  ) {}

  async createFromAdmin(createQnaDto: CreateQnaDto): Promise<Qna> {
    const { title, question, askerId, category, answer } = createQnaDto;
    const asker = await this.AdminRepository.findOne({
      where: { id: askerId },
    });
    if (!asker) {
      throw new Error('Admin not found');
    }

    const qna = this.qnaRepository.create({
      title,
      question,
      asker,
      category,
      answer,
      status: QnaStatus.ANSWERED,
    });

    return await this.qnaRepository.save(qna);
  }

  async createFromUser(askDto: AskDto): Promise<Qna> {
    const { title, question, askerId, category } = askDto;

    const asker = await this.userRepository.findOne({
      where: { id: askerId },
    });
    if (!asker) {
      throw new Error('User not found');
    }

    const qna = this.qnaRepository.create({
      title,
      question,
      asker,
      category,
    });

    return await this.qnaRepository.save(qna);
  }

  async findAllFromUser(): Promise<Qna[]> {
    return await this.qnaRepository.find({
      relations: ['asker'],
    });
  }

  async findAllFromAdmin(): Promise<Qna[]> {
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
    });

    if (!qna) {
      throw new NotFoundException(`Qna with ID ${id} not found`);
    }

    const { answer } = updateQnaDto;

    qna.answer = answer;
    qna.status = QnaStatus.ANSWERED;

    return await this.qnaRepository.save(qna);
  }

  async remove(id: number): Promise<void> {
    await this.qnaRepository.delete(id);
  }
}
