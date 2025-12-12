import { SchoolUser } from 'src/modules/schools/entities/school-user.entity';
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

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({ default: false })
  isSuperAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => SchoolUser, (su) => su.user)
  schoolUsers: SchoolUser[];
}
