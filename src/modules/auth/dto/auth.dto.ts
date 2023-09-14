import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'username',
    description: 'The user name for login',
    required: true,
    maxLength: 45,
  })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: 'The password for login',
    required: true,
    maxLength: 45,
  })
  readonly password: string;
}
