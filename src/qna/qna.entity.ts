import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum QnaCategory {
  GAYAHIDUP = 'Gaya Hidup',
  SOSIOEKONOMI = 'Sosio-Ekonomi',
  KEBIASAANMAKAN = 'Kebiasaan Makan',
  PENGETAHUAN = 'Pengetahuan',
  LAINNYA = 'Lainnya',
}

export enum QnaStatus {
  PENDING = 'Pending',
  ANSWERED = 'Answered',
}

@Entity()
export class Qna {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'askerId' })
  asker: User;

  @Column({ type: 'enum', enum: QnaCategory })
  category: QnaCategory;

  @Column({ type: 'enum', enum: QnaStatus, default: QnaStatus.PENDING })
  status: QnaStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
