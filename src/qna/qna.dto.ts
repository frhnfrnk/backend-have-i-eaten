import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { QnaCategory } from './qna.entity';

export class AskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsInt()
  @IsNotEmpty()
  askerId: number;

  @IsString()
  @IsNotEmpty()
  category?: QnaCategory;
}

export class CreateQnaDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsInt()
  @IsNotEmpty()
  askerId: number;

  @IsString()
  @IsNotEmpty()
  category: QnaCategory;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class UpdateQnaDto {
  @IsString()
  @IsOptional()
  answer?: string;
}
