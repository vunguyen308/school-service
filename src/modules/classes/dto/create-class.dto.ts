import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Class name',
    description: 'The name of the Class',
    required: true,
    maxLength: 45,
  })
  readonly name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 40,
    description: 'The max number of student of the Class',
    required: true,
  })
  readonly maxStudent: number;
}
