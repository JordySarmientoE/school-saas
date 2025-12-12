import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SchoolUser } from './school-user.entity';

@Entity()
export class ParentStudent {
  @PrimaryGeneratedColumn('increment')
  parentStudentId: number;

  @ManyToOne(() => SchoolUser, { nullable: false })
  @JoinColumn({ name: 'studentId' })
  @Index()
  student: SchoolUser;

  @ManyToOne(() => SchoolUser, { nullable: false })
  @JoinColumn({ name: 'parentId' })
  @Index()
  parent: SchoolUser;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
