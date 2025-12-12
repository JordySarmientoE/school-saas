import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { SchoolsRepository } from './schools.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { SchoolUser } from './entities/school-user.entity';
import { ParentStudent } from './entities/parent-student.entity';

@Module({
  controllers: [SchoolsController],
  providers: [SchoolsService, SchoolsRepository],
  imports: [TypeOrmModule.forFeature([School, SchoolUser, ParentStudent])],
})
export class SchoolsModule {}
