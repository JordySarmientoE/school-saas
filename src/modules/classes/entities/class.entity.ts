import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Index,
  OneToMany,
} from 'typeorm';
import { Classroom } from './classroom.entity';
import { ClassSchedule } from './class-schedule.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn('increment')
  classId: number;

  @Column({ length: 100 })
  @Index()
  name: string;

  @OneToMany(() => ClassSchedule, (schedule) => schedule.class)
  schedules: ClassSchedule[];

  @ManyToOne(() => Classroom, (classroom) => classroom.classes)
  classroom: Classroom;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
