import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SchoolUser } from './school-user.entity';
import { Classroom } from 'src/modules/classes/entities/classroom.entity';

@Entity()
export class School {
  @PrimaryGeneratedColumn('increment')
  schoolId: number;

  @Column({ length: 100 })
  @Index()
  name: string;

  @Column({ length: 1000 })
  address: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ length: 255 })
  @Index()
  email: string;

  @OneToMany(() => SchoolUser, (su) => su.school)
  members: SchoolUser[];

  @OneToMany(() => Classroom, (classroom) => classroom.school)
  classrooms: Classroom[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
