import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SchoolsRepository } from './schools.repository';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { AssignUserSchoolDto } from './dto/assign-user-school.dto';
import { SchoolRole } from './entities/school-user.entity';

@Injectable()
export class SchoolsService {
  constructor(private readonly schoolRepository: SchoolsRepository) {}

  async create(body: CreateSchoolDto) {
    return this.schoolRepository.save(body);
  }

  async list() {
    return this.schoolRepository.list();
  }

  async findOne(schoolId: number) {
    const school = await this.schoolRepository.findOne(schoolId);
    if (!school) {
      throw new NotFoundException(`Escuela con ${schoolId} no se encontró`);
    }
    return school;
  }

  async update(schoolId: number, body: UpdateSchoolDto) {
    const school = await this.schoolRepository.findOne(schoolId);
    if (!school) {
      throw new NotFoundException(`Escuela con ${schoolId} no se encontró`);
    }
    await this.schoolRepository.update(schoolId, body);
    return this.findOne(schoolId);
  }

  async findUserSchool(schoolId: number, userId: number, role: SchoolRole) {
    return this.schoolRepository.findUserSchool(schoolId, userId, role);
  }

  async saveUserSchool(schoolId: number, body: AssignUserSchoolDto) {
    await this.schoolRepository.saveUserSchool(
      schoolId,
      body.userId,
      body.role,
    );
  }

  async saveUsersSchool(schoolId: number, userIds: number[], role: SchoolRole) {
    return this.schoolRepository.saveUsersSchool(schoolId, userIds, role);
  }

  async findUsersInSchool(
    schoolId: number,
    userIds: number[],
    role: SchoolRole,
  ) {
    return this.schoolRepository.findUsersInSchool(schoolId, userIds, role);
  }

  async assignParent(schoolId: number, body: AssignUserSchoolDto) {
    if (body.childrenIds && body.childrenIds.length > 0) {
      const childrens = await this.findUsersInSchool(
        schoolId,
        body.childrenIds,
        SchoolRole.STUDENT,
      );

      if (childrens.length > 0) {
        throw new BadRequestException(
          `Los siguientes estudiantes ya están registrados en la escuela: ${childrens
            .map((c) => c.user.email)
            .join(', ')}`,
        );
      }

      await this.saveUsersSchool(
        schoolId,
        body.childrenIds,
        SchoolRole.STUDENT,
      );
    }

    await this.saveUserSchool(schoolId, body);
  }

  async assignStudent(schoolId: number, body: AssignUserSchoolDto) {
    if (body.parentIds && body.parentIds.length > 0) {
      const parents = await this.findUsersInSchool(
        schoolId,
        body.parentIds,
        SchoolRole.PARENT,
      );

      if (parents.length > 0) {
        throw new BadRequestException(
          `Los siguientes padres ya están registrados en la escuela: ${parents
            .map((c) => c.user.email)
            .join(', ')}`,
        );
      }

      await this.saveUsersSchool(schoolId, body.parentIds, SchoolRole.PARENT);
    }

    await this.saveUserSchool(schoolId, body);
  }

  async assignUser(schoolId: number, body: AssignUserSchoolDto) {
    const school = await this.findOne(schoolId);
    const userSchool = await this.findUserSchool(
      schoolId,
      body.userId,
      body.role,
    );
    if (userSchool) {
      throw new BadRequestException(
        `El usuario ${userSchool.user.email} ya tiene el rol de ${body.role} en la escuela ${school.name}`,
      );
    }

    switch (body.role) {
      case SchoolRole.TEACHER:
      case SchoolRole.COORDINATOR:
        await this.saveUserSchool(schoolId, body);
        break;
      case SchoolRole.PARENT:
        await this.assignParent(schoolId, body);
        break;
      case SchoolRole.STUDENT:
        await this.assignStudent(schoolId, body);
        break;
    }

    return {
      msg: 'Usuario asignado correctamente a la escuela',
    };
  }
}
