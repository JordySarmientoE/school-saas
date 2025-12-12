import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/modules/users/dto/user.dto';

export class AuthResponseDto extends UserDto {
  @ApiProperty({
    example: 'eyJhbGciOi',
  })
  access_token: string;
}
