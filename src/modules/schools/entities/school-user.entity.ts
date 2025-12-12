import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from './school.entity';
import { ParentStudent } from './parent-student.entity';

export enum SchoolRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  PARENT = 'parent',
  COORDINATOR = 'coordinator',
}

@Entity()
export class SchoolUser {
  @PrimaryGeneratedColumn('increment')
  schoolUserId: number;

  @ManyToOne(() => User, (user) => user.schoolUsers)
  @JoinColumn({ name: 'userId' })
  @Index()
  user: User;

  @ManyToOne(() => School, (school) => school.members)
  @JoinColumn({ name: 'schoolId' })
  @Index()
  school: School;

  @Column({
    type: 'enum',
    enum: SchoolRole,
  })
  role: SchoolRole;

  @OneToMany(() => ParentStudent, (ps) => ps.student)
  parentRelations: ParentStudent[];

  @OneToMany(() => ParentStudent, (ps) => ps.parent)
  childrenRelations: ParentStudent[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
