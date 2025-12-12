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
  OneToMany,
  Index,
} from 'typeorm';
import { Class } from './class.entity';
import { School } from 'src/modules/schools/entities/school.entity';
import { SchoolUser } from 'src/modules/schools/entities/school-user.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn('increment')
  classroomId: number;

  @Column({ length: 100 })
  @Index()
  name: string;

  @Column({ length: 10 })
  @Index()
  grade: string;

  @Column({ length: 5 })
  @Index()
  section: string;

  @ManyToOne(() => School, (school) => school.classrooms)
  school: School;

  @ManyToMany(() => SchoolUser)
  @JoinTable({ name: 'classroom_students' })
  students: SchoolUser[];

  @ManyToMany(() => SchoolUser)
  @JoinTable({ name: 'classroom_teachers' })
  teachers: SchoolUser[];

  @OneToMany(() => Class, (cls) => cls.classroom)
  classes: Class[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
