import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { StudentService } from './student.service';
import { IStudent } from './interfaces/student.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Student')
@ApiBearerAuth()
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({
    status: 201,
    description: 'Create student successfully',
  })
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all students' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async findAll(): Promise<IStudent[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find student by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async findOne(@Param('id') id: string): Promise<IStudent> {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update student by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async updateOne(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    return this.studentService.updateById(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student by id' })
  @ApiResponse({
    status: 200,
    description: 'Delete student successfully',
  })
  async delete(@Param('id') id: string) {
    return this.studentService.delete(id);
  }
}
