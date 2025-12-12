import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UserBaseDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: '2024-12-09T10:30:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-12-09T10:30:00Z' })
  updatedAt: Date;

  @ApiProperty({ nullable: true, example: null })
  deletedAt: Date | null;
}
