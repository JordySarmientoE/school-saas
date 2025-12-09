import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { hashString } from 'src/@common/utils/bcrypt.utils';
import { Role } from './entities/user-role.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: number) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async create(body: CreateUserDto) {
    const user = await this.usersRepository.findByEmail(body.email);
    if (user) {
      throw new NotFoundException(`Usuario con email ${body.email} ya existe`);
    }
    const hashedPassword = await hashString(body.password);
    const role = Role.STUDENT;
    const { userId } = await this.usersRepository.save(
      {
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        phone: body.phone,
        password: hashedPassword,
      },
      role,
    );

    return this.findById(userId);
  }
}
