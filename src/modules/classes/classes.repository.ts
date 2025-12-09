import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassesRepository {
  constructor(
    @InjectRepository(Class)
    private readonly repository: Repository<Class>,
  ) {}

  async list(): Promise<Class[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      relations: ['classrooms'],
    });
  }
}
