import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value !== undefined ? String(value).trim() : undefined,
  )
  @ApiProperty()
  name?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value !== undefined ? String(value).trim() : undefined,
  )
  @ApiProperty()
  lastname?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value !== undefined ? String(value).trim() : undefined,
  )
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  @ApiProperty()
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(9, 9, { message: 'Phone number must be exactly 9 characters long' })
  phone: string;
}
