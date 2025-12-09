import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, IsNull } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, UserRole } from './entities/user-role.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async findByEmail(email: string) {
    return this.repository.findOne({
      where: { email, deletedAt: IsNull() },
      select: ['userId', 'email', 'password'],
      relations: ['roles', 'children', 'parent'],
    });
  }

  async findById(userId: number) {
    return this.repository.findOne({
      where: { userId, deletedAt: IsNull() },
      relations: ['roles', 'children', 'parent'],
    });
  }

  async save(user: CreateUserDto, role: Role) {
    return this.repository.save({ ...user, role });
  }
}
