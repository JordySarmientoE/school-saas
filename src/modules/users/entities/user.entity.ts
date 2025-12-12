import { Classroom } from 'src/modules/classes/entities/classroom.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserRole } from './user-role.entity';
import { School } from 'src/modules/schools/entities/school.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  userId: number;

  @Column({ length: 255, unique: true, nullable: true })
  @Index()
  email: string;

  @Column({ length: 255, select: false, nullable: true })
  password: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ length: 12, nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => UserRole, (userRole) => userRole.users, { eager: true })
  @JoinTable({ name: 'user_roles' })
  roles: UserRole[];

  @OneToMany(() => User, (user) => user.parent)
  children: User[];

  @ManyToOne(() => User, (user) => user.children, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: User;

  @Column({ nullable: true })
  parentId: number | null;

  @OneToMany(() => Classroom, (classroom) => classroom.teacher)
  teacherClassrooms: Classroom[];

  @ManyToMany(() => Classroom, (classroom) => classroom.students)
  studentClassrooms: Classroom[];

  @ManyToMany(() => User, (user) => user.studentClassrooms)
  @JoinTable({ name: 'school_users' })
  schools: School[];
}
