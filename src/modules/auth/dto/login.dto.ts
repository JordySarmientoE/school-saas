import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  @Transform(({ value }) => String(value).trim())
  email: string;

  @IsString()
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  @ApiProperty()
  password: string;
}
