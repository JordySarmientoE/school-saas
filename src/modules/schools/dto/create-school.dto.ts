import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  @ApiProperty()
  @Transform(({ value }) => String(value).trim())
  name: string;

  @IsString()
  @ApiProperty()
  @Transform(({ value }) => String(value).trim())
  address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(9, 9, { message: 'Phone number must be exactly 9 characters long' })
  phone: string;

  @IsEmail()
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => String(value).toLowerCase().toLowerCase())
  email: string;

  @IsString()
  @ApiProperty()
  @Transform(({ value }) => String(value).trim())
  code: string;
}
