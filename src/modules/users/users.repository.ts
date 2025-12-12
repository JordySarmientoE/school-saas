import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, IsNull, Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, UserRole } from './entities/user-role.entity';
import { ListUsersDto } from './dto/list-users.dto';

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
      relations: ['roles', 'children', 'parent', 'schools'],
    });
  }

  async findById(userId: number) {
    return this.repository.findOne({
      where: { userId, deletedAt: IsNull() },
      relations: ['roles', 'children', 'parent', 'schools'],
    });
  }

  async save(user: CreateUserDto) {
    return this.repository.save(user);
  }

  async assignRole(user: User, role: Role) {
    const userRole = await this.userRoleRepository.save({
      userRoleId: user.userId,
      role,
    });
    const roles = user.roles || [];
    roles.push(userRole);
    user.roles = roles;
    await this.save(user);
  }

  async listAll(filters: ListUsersDto) {
    return this.repository.find({
      where: {
        deletedAt: IsNull(),
        ...(filters.name && { name: Like(`${filters.name}%`) }),
        ...(filters.phone && { phone: filters.phone }),
        ...(filters.email && { email: Like(`${filters.email}%`) }),
        ...(filters.role && { roles: { role: filters.role } }),
      },
      relations: ['roles', 'children', 'parent', 'schools'],
    });
  }
}
