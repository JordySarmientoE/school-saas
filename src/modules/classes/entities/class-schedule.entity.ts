import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Class } from './class.entity';

export enum DayOfWeek {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}

@Entity()
export class ClassSchedule {
  @PrimaryGeneratedColumn('increment')
  scheduleId: number;

  @Column({ type: 'enum', enum: DayOfWeek })
  @Index()
  dayOfWeek: DayOfWeek;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @ManyToOne(() => Class, (cls) => cls.schedules)
  class: Class;
}
