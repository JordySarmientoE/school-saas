import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class School {
  @PrimaryGeneratedColumn('increment')
  schoolId: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 1000 })
  address: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 20 })
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
