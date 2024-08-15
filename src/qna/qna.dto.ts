import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateQnaDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsOptional()
  answer?: string;

  @IsInt()
  @IsNotEmpty()
  askerId: number;
}

export class UpdateQnaDto {
  @IsString()
  @IsOptional()
  question?: string;

  @IsString()
  @IsOptional()
  answer?: string;

  @IsInt()
  @IsOptional()
  askerId?: number;
}
