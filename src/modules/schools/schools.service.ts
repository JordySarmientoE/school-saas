import { Injectable, NotFoundException } from '@nestjs/common';
import { SchoolsRepository } from './schools.repository';

@Injectable()
export class SchoolsService {
  constructor(private readonly schoolRepository: SchoolsRepository) {}

  async list() {
    return this.schoolRepository.list();
  }

  async findOne(id: number) {
    const school = await this.schoolRepository.findOne(id);
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }
    return school;
  }
}
