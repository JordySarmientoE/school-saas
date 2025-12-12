import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';

export enum Role {
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'parent',
  COORDINATOR = 'coordinator',
  ADMIN = 'admin',
}

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn('increment')
  userRoleId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Role,
    default: Role.STUDENT,
  })
  role: Role;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
