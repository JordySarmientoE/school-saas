import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';

@Injectable()
export class SchoolsRepository {
  constructor(
    @InjectRepository(School)
    private readonly repository: Repository<School>,
  ) {}

  async save(body: CreateSchoolDto) {
    return this.repository.save(body);
  }

  async list(): Promise<School[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
    });
  }

  async findOne(id: number): Promise<School | null> {
    return this.repository.findOne({
      where: { schoolId: id, deletedAt: IsNull() },
    });
  }
}
