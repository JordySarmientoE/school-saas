import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Class } from './class.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn('increment')
  classroomId: number;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Class, (cls) => cls.classrooms)
  class: Class;

  @ManyToOne(() => User, (user) => user.teacherClassrooms)
  teacher: User;

  @ManyToMany(() => User, (user) => user.studentClassrooms)
  @JoinTable({ name: 'classroom_students' })
  students: User[];
}
