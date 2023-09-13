import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Student code',
    description: 'The code of the Student',
    required: true,
    maxLength: 45,
  })
  readonly studentCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Student name',
    description: 'The name of the Student',
    required: true,
    maxLength: 45,
  })
  readonly name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 2000,
    description: 'The year of birth of the Student',
    required: true,
  })
  readonly birthYear: number;
}
