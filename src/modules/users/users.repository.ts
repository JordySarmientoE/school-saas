import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, IsNull, Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUsersDto } from './dto/list-users.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.repository.findOne({
      where: { email, deletedAt: IsNull() },
      select: ['userId', 'email', 'password'],
      relations: ['schoolUsers', 'schoolUsers.school'],
    });
  }

  async findById(userId: number) {
    return this.repository.findOne({
      where: { userId, deletedAt: IsNull() },
      relations: ['schoolUsers', 'schoolUsers.school'],
    });
  }

  async save(user: CreateUserDto) {
    return this.repository.save(user);
  }

  async listAll(filters: ListUsersDto) {
    return this.repository.find({
      where: {
        deletedAt: IsNull(),
        ...(filters.name && { name: Like(`${filters.name}%`) }),
        ...(filters.phone && { phone: filters.phone }),
        ...(filters.email && { email: Like(`${filters.email}%`) }),
      },
      relations: ['schoolUsers', 'schoolUsers.school'],
    });
  }
}
