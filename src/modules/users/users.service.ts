import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { hashString } from 'src/@common/utils/bcrypt.utils';
import { ListUsersDto } from './dto/list-users.dto';

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
    const userExists = await this.usersRepository.findByEmail(body.email);
    if (userExists) {
      throw new NotFoundException(`Usuario con email ${body.email} ya existe`);
    }
    const hashedPassword = await hashString(body.password);
    const { userId } = await this.usersRepository.save({
      name: body.name,
      lastname: body.lastname,
      email: body.email,
      phone: body.phone,
      password: hashedPassword,
    });

    return this.findById(userId);
  }

  async listAll(filters: ListUsersDto) {
    return this.usersRepository.listAll(filters);
  }
}
