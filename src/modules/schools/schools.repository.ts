import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, In } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { SchoolUser, SchoolRole } from './entities/school-user.entity';
import { ParentStudent } from './entities/parent-student.entity';

@Injectable()
export class SchoolsRepository {
  constructor(
    @InjectRepository(School)
    private readonly repository: Repository<School>,
    @InjectRepository(SchoolUser)
    private readonly schoolUserRepository: Repository<SchoolUser>,
    @InjectRepository(ParentStudent)
    private readonly parentStudentRepository: Repository<ParentStudent>,
  ) {}

  async save(body: CreateSchoolDto) {
    return this.repository.save(body);
  }

  async list(): Promise<School[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
    });
  }

  async findOne(schoolId: number): Promise<School | null> {
    return this.repository.findOne({
      where: { schoolId, deletedAt: IsNull() },
    });
  }

  async update(schoolId: number, body: UpdateSchoolDto) {
    await this.repository.update(schoolId, body);
  }

  async findUserSchool(schoolId: number, userId: number, role: SchoolRole) {
    return this.schoolUserRepository.findOne({
      where: {
        school: { schoolId },
        user: { userId },
        role,
        deletedAt: IsNull(),
      },
      relations: ['user'],
    });
  }

  async findUsersInSchool(
    schoolId: number,
    userIds: number[],
    role: SchoolRole,
  ) {
    return this.schoolUserRepository.find({
      where: {
        school: { schoolId },
        user: { userId: In(userIds) },
        role,
        deletedAt: IsNull(),
      },
      relations: ['user'],
    });
  }

  async saveUserSchool(schoolId: number, userId: number, role: SchoolRole) {
    return this.schoolUserRepository.save({
      school: { schoolId },
      user: { userId },
      role,
    });
  }

  async saveUsersSchool(schoolId: number, userIds: number[], role: SchoolRole) {
    const schoolUsers = userIds.map((userId) => ({
      school: { schoolId },
      user: { userId },
      role,
    }));

    return this.schoolUserRepository.save(schoolUsers);
  }

  async saveParentStudent(parentId: number, studentId: number) {
    return this.parentStudentRepository.save({
      parent: { schoolUserId: parentId },
      student: { schoolUserId: studentId },
    });
  }
}
