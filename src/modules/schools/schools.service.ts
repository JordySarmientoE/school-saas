import { Injectable, NotFoundException } from '@nestjs/common';
import { SchoolsRepository } from './schools.repository';
import { CreateSchoolDto } from './dto/create-school.dto';

@Injectable()
export class SchoolsService {
  constructor(private readonly schoolRepository: SchoolsRepository) {}

  async create(body: CreateSchoolDto) {
    return this.schoolRepository.save(body);
  }

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
