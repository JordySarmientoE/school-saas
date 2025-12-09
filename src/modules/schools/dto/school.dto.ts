import { ApiProperty } from '@nestjs/swagger';
import { CreateSchoolDto } from './create-school.dto';

export class SchoolDto extends CreateSchoolDto {
  @ApiProperty()
  schoolId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true })
  deletedAt: Date | null;
}
